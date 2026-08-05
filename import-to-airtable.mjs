#!/usr/bin/env node
/**
 * import-to-airtable.mjs — bulk-create PE tracker records in Airtable from a
 * local batch JSON file, so a researched batch skips manual grid entry.
 *
 * Usage:
 *   node --env-file=.env import-to-airtable.mjs batch.json            # DRY RUN (default)
 *   node --env-file=.env import-to-airtable.mjs batch.json --commit   # actually write
 *
 * The token must have BOTH data.records:read AND data.records:write on the base
 * (the export-only token needs read; add write for this script).
 *
 * Input shape (nested — mirrors how batches are presented):
 *   {
 *     "firms": [
 *       { "firm_id","firm_name","firm_type","headquarters","portfolio_url","notes",
 *         "tags": [ { "tag","evidence_tier","description","source_url","publish" } ] }
 *     ],
 *     "businesses": [
 *       { "business_id","business_name","industry","owning_firm_id","platform_company",
 *         "acquisition_date","ownership_status","source_url","last_verified","submitter",
 *         "review_status",
 *         "locations": [ { "city","state","street_address" } ],
 *         "evidence": [ { "tag","evidence_tier","description","source_url","publish" } ] }
 *     ]
 *   }
 *
 * `evidence` is business-specific documentation (a DOJ/AG action against that
 * chain, etc.) that renders only on that business — use it for facts that
 * belong to the business rather than the firm's overall pattern, including
 * conduct that predates the current owner. Same shape as a firm tag.
 *
 * Safety:
 *   - Dedup by slug: a firm_id / business_id that already exists is SKIPPED, never
 *     duplicated. (An existing firm's tags are left as-is.)
 *   - Dry run unless --commit, so you always preview the plan first.
 *   - Conservative defaults: business review_status → "pending", tag publish → false
 *     unless the input says otherwise. Nothing goes live until you verify in Airtable
 *     (or the input explicitly sets verified/true after the batch is approved).
 */

import { readFile } from "node:fs/promises";

const TABLES = {
  firms: "Firms",
  firmTags: "Firm Tags",
  businesses: "Businesses",
  locations: "locations",
  businessTags: "Business Tags",
};

// The evidence_tier single-select in your base uses descriptive labels. Map the
// canonical letter to the EXACT option text. ⚠ "B" is confirmed from your base;
// verify "A" and "C" match your options exactly (edit if they differ).
const TIER_LABELS = {
  A: "A = confirmed / primary doc",
  B: "B = reported / investigative journalism",
  C: "C = alleged / pending",
};

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

const args = process.argv.slice(2);
const COMMIT = args.includes("--commit");
const inputPath = args.find((a) => !a.startsWith("--"));

if (!TOKEN || !BASE_ID) {
  console.error("Missing AIRTABLE_TOKEN / AIRTABLE_BASE_ID. Run with --env-file=.env");
  process.exit(1);
}
if (!inputPath) {
  console.error("Usage: node --env-file=.env import-to-airtable.mjs <batch.json> [--commit]");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const clean = (v) => (typeof v === "string" ? v.trim() : v);

// Build a fields object, dropping empty/undefined so we don't write blanks.
function fields(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (typeof v === "string" && v.trim() === "") continue;
    out[k] = clean(v);
  }
  return out;
}

async function fetchAll(table) {
  const records = [];
  let offset;
  do {
    const url = new URL(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(table)}`);
    url.searchParams.set("pageSize", "100");
    if (offset) url.searchParams.set("offset", offset);
    const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` } });
    if (!res.ok) throw new Error(`Read "${table}" failed: ${res.status} ${await res.text()}`);
    const data = await res.json();
    records.push(...data.records);
    offset = data.offset;
  } while (offset);
  return records;
}

// Create records in chunks of 10 (Airtable's per-request max), throttled to
// stay under the 5 req/sec limit. Returns created records (with ids), in order.
async function createRecords(table, rows) {
  const created = [];
  for (let i = 0; i < rows.length; i += 10) {
    const chunk = rows.slice(i, i + 10);
    const res = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(table)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ records: chunk.map((f) => ({ fields: f })), typecast: true }),
      }
    );
    if (!res.ok) throw new Error(`Create in "${table}" failed: ${res.status} ${await res.text()}`);
    const data = await res.json();
    created.push(...data.records);
    await sleep(220);
  }
  return created;
}

// ── Load input + existing state ─────────────────────────────────────────────
const input = JSON.parse(await readFile(inputPath, "utf8"));
const inFirms = input.firms || [];
const inBusinesses = input.businesses || [];

// Read a table but tolerate it not existing yet (Airtable answers a missing
// table with 403). Used for Business Tags, which may not be created on first run.
async function fetchAllOptional(table) {
  try {
    return await fetchAll(table);
  } catch (e) {
    console.warn(`  ⚠ Could not read "${table}" (${String(e.message).split("\n")[0]}) — treating as empty.`);
    return [];
  }
}

console.log(`Reading existing records from Airtable…`);
const [existingFirms, existingBiz, existingBizTags] = await Promise.all([
  fetchAll(TABLES.firms),
  fetchAll(TABLES.businesses),
  fetchAllOptional(TABLES.businessTags),
]);

// slug → record id, for dedup and for linking businesses/evidence to their parents.
const firmIdToRec = new Map();
for (const r of existingFirms) if (r.fields.firm_id) firmIdToRec.set(r.fields.firm_id, r.id);
const bizIdSet = new Set(existingBiz.map((r) => r.fields.business_id).filter(Boolean));
const bizIdToRec = new Map();
for (const r of existingBiz) if (r.fields.business_id) bizIdToRec.set(r.fields.business_id, r.id);

// Dedup key for a piece of business evidence, so re-running never duplicates it.
// Keyed by business record + tag + source_url + description, so two distinct
// findings that happen to cite the SAME source (e.g. one article documenting
// both a financial and a care-quality problem) don't collide.
const norm = (s) => (typeof s === "string" ? s.trim() : "");
const evidenceKey = (bizRec, e) =>
  `${bizRec}::${norm(e.tag)}::${norm(e.source_url)}::${norm(e.description)}`;
const existingEvidenceKeys = new Set();
for (const r of existingBizTags) {
  const f = r.fields;
  const bizRec = Array.isArray(f.business) && f.business.length ? f.business[0] : null;
  if (bizRec) existingEvidenceKeys.add(evidenceKey(bizRec, f));
}

const plan = { firmsNew: [], firmsSkip: [], bizNew: [], bizSkip: [], tags: 0, locations: 0, evidence: 0, evidenceRows: [] };

for (const f of inFirms) {
  if (firmIdToRec.has(f.firm_id)) plan.firmsSkip.push(f.firm_id);
  else plan.firmsNew.push(f);
}
plan.tags = plan.firmsNew.reduce((n, f) => n + (f.tags?.length || 0), 0);

for (const b of inBusinesses) {
  if (bizIdSet.has(b.business_id)) plan.bizSkip.push(b.business_id);
  else plan.bizNew.push(b);
}
plan.locations = plan.bizNew.reduce((n, b) => n + (b.locations?.length || 0), 0);

// Evidence can attach to ANY input business — new or already-existing — so long
// as it isn't already present. New businesses have no record id yet, but a
// brand-new business can't have pre-existing evidence, so all of theirs counts.
for (const b of inBusinesses) {
  const ev = b.evidence || [];
  if (!ev.length) continue;
  const existingRec = bizIdToRec.get(b.business_id); // set only for existing businesses
  const seen = new Set();
  let cnt = 0;
  for (const e of ev) {
    if (existingRec) {
      const k = evidenceKey(existingRec, e);
      if (existingEvidenceKeys.has(k) || seen.has(k)) continue;
      seen.add(k);
    }
    cnt++;
  }
  if (cnt) {
    plan.evidence += cnt;
    plan.evidenceRows.push({ id: b.business_id, existing: !!existingRec, count: cnt });
  }
}

// ── Print the plan ──────────────────────────────────────────────────────────
console.log(`\n${COMMIT ? "COMMIT" : "DRY RUN"} — plan for ${inputPath}:`);
console.log(`  Firms:      ${plan.firmsNew.length} new, ${plan.firmsSkip.length} already exist`);
plan.firmsNew.forEach((f) => console.log(`      + ${f.firm_name} (${f.firm_id}), ${f.tags?.length || 0} tag(s)`));
plan.firmsSkip.forEach((s) => console.log(`      · skip existing firm: ${s}`));
console.log(`  Firm Tags:  ${plan.tags} new (on new firms only)`);
console.log(`  Businesses: ${plan.bizNew.length} new, ${plan.bizSkip.length} already exist`);
plan.bizNew.forEach((b) => console.log(`      + ${b.business_name} (${b.business_id}) → ${b.owning_firm_id}, ${b.locations?.length || 0} location(s)`));
plan.bizSkip.forEach((s) => console.log(`      · skip existing business: ${s}`));
console.log(`  Locations:  ${plan.locations} new`);
console.log(`  Business evidence: ${plan.evidence} new (existing evidence is de-duplicated)`);
plan.evidenceRows.forEach((r) => console.log(`      + ${r.count} on ${r.id}${r.existing ? " (existing business)" : ""}`));

if (!COMMIT) {
  console.log(`\nDry run only — nothing written. Re-run with --commit to apply.`);
  process.exit(0);
}

// ── Write: firms → tags → businesses → locations ────────────────────────────
console.log(`\nWriting…`);

// 1) Firms
if (plan.firmsNew.length) {
  const rows = plan.firmsNew.map((f) =>
    fields({
      firm_id: f.firm_id,
      firm_name: f.firm_name,
      firm_type: f.firm_type,
      headquarters: f.headquarters,
      portfolio_url: f.portfolio_url,
      notes: f.notes,
    })
  );
  const made = await createRecords(TABLES.firms, rows);
  plan.firmsNew.forEach((f, i) => firmIdToRec.set(f.firm_id, made[i].id));
  console.log(`  ✓ ${made.length} firms`);
}

// 2) Tags (only for the firms we just created)
const tagRows = [];
for (const f of plan.firmsNew) {
  for (const t of f.tags || []) {
    tagRows.push(
      fields({
        firm: [firmIdToRec.get(f.firm_id)],
        tag: t.tag,
        evidence_tier: TIER_LABELS[String(t.evidence_tier).trim().toUpperCase()] || t.evidence_tier,
        description: t.description,
        source_url: t.source_url,
        publish: t.publish === true,
      })
    );
  }
}
if (tagRows.length) {
  const made = await createRecords(TABLES.firmTags, tagRows);
  console.log(`  ✓ ${made.length} firm tags`);
}

// 3) Businesses
const bizWithLocs = []; // [{ recId, locations }]
if (plan.bizNew.length) {
  const rows = plan.bizNew.map((b) => {
    const firmRec = firmIdToRec.get(b.owning_firm_id);
    if (!firmRec) console.warn(`  ⚠ ${b.business_name}: owning firm "${b.owning_firm_id}" not found — creating without firm link.`);
    return fields({
      business_id: b.business_id,
      business_name: b.business_name,
      industry: b.industry,
      owning_firm_id: firmRec ? [firmRec] : undefined,
      platform_company: b.platform_company,
      acquisition_date: b.acquisition_date,
      ownership_status: b.ownership_status,
      source_url: b.source_url,
      last_verified: b.last_verified,
      submitter: b.submitter || "research-batch",
      review_status: b.review_status || "pending",
    });
  });
  const made = await createRecords(TABLES.businesses, rows);
  plan.bizNew.forEach((b, i) => {
    bizWithLocs.push({ recId: made[i].id, locations: b.locations || [] });
    bizIdToRec.set(b.business_id, made[i].id); // so evidence can now link to it
  });
  console.log(`  ✓ ${made.length} businesses`);
}

// 4) Locations
const locRows = [];
for (const { recId, locations } of bizWithLocs) {
  for (const l of locations) {
    locRows.push(
      fields({
        business: [recId],
        city: l.city,
        state: l.state ? String(l.state).trim().toUpperCase() : undefined,
        street_address: l.street_address,
      })
    );
  }
}
if (locRows.length) {
  const made = await createRecords(TABLES.locations, locRows);
  console.log(`  ✓ ${made.length} locations`);
}

// 5) Business evidence — for ANY input business (new or existing), skipping
// evidence that already exists so re-runs stay idempotent.
const bizTagRows = [];
for (const b of inBusinesses) {
  const recId = bizIdToRec.get(b.business_id);
  if (!recId || !b.evidence?.length) continue;
  for (const e of b.evidence) {
    const key = evidenceKey(recId, e);
    if (existingEvidenceKeys.has(key)) continue;
    existingEvidenceKeys.add(key);
    bizTagRows.push(
      fields({
        business: [recId],
        tag: e.tag,
        evidence_tier: TIER_LABELS[String(e.evidence_tier).trim().toUpperCase()] || e.evidence_tier,
        description: e.description,
        source_url: e.source_url,
        publish: e.publish === true,
      })
    );
  }
}
if (bizTagRows.length) {
  const made = await createRecords(TABLES.businessTags, bizTagRows);
  console.log(`  ✓ ${made.length} business evidence`);
}

console.log(`\nDone. Review the new rows in Airtable, then flip review_status to "verified"`);
console.log(`(and tag publish ✓) for anything ready to go live, and run the export.`);
