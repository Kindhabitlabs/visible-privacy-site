#!/usr/bin/env node
/**
 * export-pe-data.mjs — Airtable → pe-data.json publish step for the PE Ownership Tracker.
 *
 * What it does:
 *   1. Pulls the Airtable tables (Firms, Firm Tags, Businesses, Locations, and
 *      the optional Business Tags for per-business evidence).
 *   2. Applies the publish gates from the spec:
 *        - Businesses:  review_status === "verified" AND a non-empty source_url.
 *        - Firm Tags:   publish checked AND evidence_tier in A/B/C.
 *                       Tier C is kept but marked { alleged: true } so the page
 *                       renders the required "alleged / pending" label. Anything
 *                       below C (or unpublished) never leaves Airtable.
 *   3. Reshapes the flat tables into the nested shape the page reads:
 *        - firms carry their inherited-once tags (the two-layer model)
 *        - businesses carry firm_id + inlined locations; the page joins to the
 *          firm to display inherited tags, so tags stay maintained once per firm.
 *   4. Writes pe-data.json to the repo root and prints a summary of what was
 *      included and what was skipped (and why).
 *
 * Usage:
 *   AIRTABLE_TOKEN=pat_xxx AIRTABLE_BASE_ID=app_xxx node scripts/export-pe-data.mjs
 *
 * Getting the two values:
 *   - AIRTABLE_TOKEN:  Airtable → Builder Hub → Personal access tokens.
 *                      Scope needed: data.records:read (and data.recordComments:read
 *                      is NOT needed). Grant the token access to the PE-tracker base.
 *   - AIRTABLE_BASE_ID: open the base, the URL starts https://airtable.com/appXXXXXXXX
 *                       — the appXXXXXXXX part is the base id.
 *
 * NEVER commit the token. Keep it in your shell or a gitignored env file.
 */

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// ── Config ────────────────────────────────────────────────────────────────
// Table names must match your Airtable base exactly (case + spaces).
const TABLES = {
  firms: "Firms",
  firmTags: "Firm Tags",
  businesses: "Businesses",
  locations: "locations",
  // Optional: per-business evidence (DOJ/AG actions etc.) that belongs to a
  // specific business rather than a firm's overall pattern — mirrors Firm Tags
  // but links to a business. Treated as empty if the table doesn't exist yet.
  businessTags: "Business Tags",
};

const OUTPUT_FILE = "pe-data.json";
const VALID_TIERS = ["A", "B", "C"];

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!TOKEN || !BASE_ID) {
  console.error(
    "Missing credentials. Run with:\n" +
      "  AIRTABLE_TOKEN=pat_xxx AIRTABLE_BASE_ID=app_xxx node scripts/export-pe-data.mjs"
  );
  process.exit(1);
}

// ── Airtable fetch (handles pagination) ─────────────────────────────────────
async function fetchAll(table, { optional = false } = {}) {
  const records = [];
  let offset;
  do {
    const url = new URL(
      `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(table)}`
    );
    url.searchParams.set("pageSize", "100");
    if (offset) url.searchParams.set("offset", offset);

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    // An optional table (e.g. Business Tags before it's created) may not exist
    // yet — warn and treat it as empty rather than failing the export. Airtable
    // answers a missing table with 403 (INVALID_PERMISSIONS_OR_MODEL_NOT_FOUND),
    // not 404, so accept either for optional tables.
    if ((res.status === 404 || res.status === 403) && optional) {
      console.warn(`  ⚠ Table "${table}" not found or inaccessible — treating as empty.`);
      return [];
    }
    if (!res.ok) {
      throw new Error(
        `Airtable error on "${table}": ${res.status} ${res.statusText}\n${await res.text()}`
      );
    }
    const data = await res.json();
    records.push(...data.records);
    offset = data.offset;
  } while (offset);
  return records;
}

// ── Small helpers ───────────────────────────────────────────────────────────
const str = (v) => {
  if (typeof v === "string") return v.trim();
  if (v == null) return "";
  // Airtable returns { state, value, isStale } for some empty/computed cells.
  if (typeof v === "object" && !Array.isArray(v)) {
    return typeof v.value === "string" ? v.value.trim() : "";
  }
  return String(v);
};
// Collapse an ISO datetime to a plain YYYY-MM-DD (Date fields can carry a time).
const dateOnly = (v) => {
  const s = str(v);
  return /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : s;
};
const firstLink = (v) => (Array.isArray(v) && v.length ? v[0] : null);

// ── Main ────────────────────────────────────────────────────────────────────
const summary = {
  firms_included: 0,
  businesses_included: 0,
  tags_included: 0,
  evidence_included: 0,
  skipped_businesses: [], // { name, reason }
  skipped_tags: 0,
  skipped_evidence: 0,
};

console.log("Fetching from Airtable…");
const [firmRows, tagRows, bizRows, locRows, bizTagRows] = await Promise.all([
  fetchAll(TABLES.firms),
  fetchAll(TABLES.firmTags),
  fetchAll(TABLES.businesses),
  fetchAll(TABLES.locations, { optional: true }),
  fetchAll(TABLES.businessTags, { optional: true }),
]);
console.log(
  `  Firms: ${firmRows.length}  Tags: ${tagRows.length}  ` +
    `Businesses: ${bizRows.length}  Locations: ${locRows.length}  ` +
    `Business evidence: ${bizTagRows.length}`
);

// Index locations by their Airtable record id, for inlining into businesses.
const locationByRec = new Map();
for (const r of locRows) {
  const f = r.fields;
  locationByRec.set(r.id, {
    city: str(f.city),
    state: str(f.state).toUpperCase(),
    street_address: str(f.street_address),
  });
}

// Turn a Firm-Tags / Business-Tags row into a published tag object, applying the
// shared publish gate. Returns { linkRec, tag } or null if it fails the gate.
// `linkField` is the name of the record-link column ("firm" or "business").
function parsePublishedTag(f, linkField) {
  // Take just the leading letter, so both "B" and a descriptive single-select
  // label like "B = reported / investigative journalism" normalize to "B".
  const tier = str(f.evidence_tier).trim().charAt(0).toUpperCase();
  const published = f.publish === true;

  // Publish gate: must be explicitly published and a recognized tier.
  if (!published || !VALID_TIERS.includes(tier)) return null;
  const linkRec = firstLink(f[linkField]);
  if (!linkRec) return null;

  return {
    linkRec,
    tag: {
      tag: str(f.tag),
      tier, // "A" | "B" | "C"
      alleged: tier === "C", // page must show the "alleged / pending" label
      description: str(f.description),
      source_url: str(f.source_url),
    },
  };
}

// Group published firm tags by owning firm's record id.
const tagsByFirmRec = new Map();
for (const r of tagRows) {
  const parsed = parsePublishedTag(r.fields, "firm");
  if (!parsed) {
    summary.skipped_tags++;
    continue;
  }
  if (!tagsByFirmRec.has(parsed.linkRec)) tagsByFirmRec.set(parsed.linkRec, []);
  tagsByFirmRec.get(parsed.linkRec).push(parsed.tag);
}

// Group published business-level evidence by business record id. Same gate and
// shape as firm tags, but this evidence renders only on that one business
// (used for DOJ/AG actions specific to a chain — including conduct that may
// predate the current owner, which the firm-level model can't represent).
const evidenceByBizRec = new Map();
for (const r of bizTagRows) {
  const parsed = parsePublishedTag(r.fields, "business");
  if (!parsed) {
    summary.skipped_evidence++;
    continue;
  }
  if (!evidenceByBizRec.has(parsed.linkRec)) evidenceByBizRec.set(parsed.linkRec, []);
  evidenceByBizRec.get(parsed.linkRec).push(parsed.tag);
}

// Build a firm lookup keyed by record id (slug + display data + tags).
const firmByRec = new Map();
for (const r of firmRows) {
  const f = r.fields;
  firmByRec.set(r.id, {
    id: str(f.firm_id),
    name: str(f.firm_name),
    type: str(f.firm_type),
    headquarters: str(f.headquarters),
    portfolio_url: str(f.portfolio_url),
    notes: str(f.notes),
    tags: tagsByFirmRec.get(r.id) || [],
  });
}

// Walk businesses, applying the verified + source gates, and collect the firms
// they actually reference (so we don't ship orphan firms).
const businesses = [];
const referencedFirmRecs = new Set();

for (const r of bizRows) {
  const f = r.fields;
  const name = str(f.business_name) || "(unnamed)";
  const status = str(f.review_status).toLowerCase();
  const source = str(f.source_url);

  if (status !== "verified") {
    summary.skipped_businesses.push({ name, reason: `status="${status || "blank"}"` });
    continue;
  }
  if (!source) {
    summary.skipped_businesses.push({ name, reason: "no source_url" });
    continue;
  }

  const firmRec = firstLink(f.owning_firm_id);
  const firm = firmRec ? firmByRec.get(firmRec) : null;
  if (firmRec) referencedFirmRecs.add(firmRec);
  if (!firm) {
    // Facts are still worth publishing, but flag the missing ownership link.
    console.warn(`  ⚠ "${name}" is verified but has no owning firm linked.`);
  }

  const locations = (Array.isArray(f.locations) ? f.locations : [])
    .map((id) => locationByRec.get(id))
    // Drop blank Locations rows (e.g. Airtable's leftover empty default rows).
    .filter((loc) => loc && (loc.city || loc.state));

  const evidence = evidenceByBizRec.get(r.id) || [];
  summary.evidence_included += evidence.length;

  businesses.push({
    id: str(f.business_id),
    name,
    industry: str(f.industry),
    firm_id: firm ? firm.id : null,
    firm_name: firm ? firm.name : "",
    platform_company: str(f.platform_company),
    acquisition_date: str(f.acquisition_date),
    ownership_status: str(f.ownership_status),
    source_url: source,
    last_verified: dateOnly(f.last_verified),
    locations,
    evidence, // business-specific evidence; renders only on this business
  });
}

// Only emit firms referenced by at least one published business.
const firms = [...referencedFirmRecs]
  .map((rec) => firmByRec.get(rec))
  .filter(Boolean)
  .sort((a, b) => a.name.localeCompare(b.name));

businesses.sort((a, b) => a.name.localeCompare(b.name));

summary.firms_included = firms.length;
summary.businesses_included = businesses.length;
summary.tags_included = firms.reduce((n, fm) => n + fm.tags.length, 0);

const output = {
  generated_at: new Date().toISOString(),
  counts: {
    firms: firms.length,
    businesses: businesses.length,
    tags: summary.tags_included,
    evidence: summary.evidence_included,
  },
  firms,
  businesses,
};

const outPath = join(dirname(fileURLToPath(import.meta.url)), OUTPUT_FILE);
await writeFile(outPath, JSON.stringify(output, null, 2) + "\n");

// ── Summary ─────────────────────────────────────────────────────────────────
console.log(`\nWrote ${OUTPUT_FILE}`);
console.log(`  Firms published:      ${summary.firms_included}`);
console.log(`  Businesses published: ${summary.businesses_included}`);
console.log(`  Firm tags published:  ${summary.tags_included}`);
console.log(`  Business evidence published: ${summary.evidence_included}`);
console.log(`  Tags skipped (unpublished / bad tier): ${summary.skipped_tags}`);
if (summary.skipped_evidence) {
  console.log(`  Business evidence skipped (unpublished / bad tier): ${summary.skipped_evidence}`);
}
if (summary.skipped_businesses.length) {
  console.log(`  Businesses skipped (${summary.skipped_businesses.length}):`);
  for (const s of summary.skipped_businesses) {
    console.log(`    - ${s.name}  [${s.reason}]`);
  }
}
