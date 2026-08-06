// PE Ownership Tracker — reads pe-data.json (generated from Airtable by
// export-pe-data.mjs) and renders a faceted, filterable list of businesses.
//
// Two-layer model: businesses carry facts + a firm_id; firms carry the
// practice tags. A business inherits its owning firm's tags at render time,
// so tags are looked up via firmById[business.firm_id], never stored per row.

const SUBMISSION_FORM_URL = "https://airtable.com/appH6PBGeN9oVJ5a0/shrzWNKmqwp1mj16O";

const TAG_COLORS = {
  "Labor": "#ef4444",
  "Data privacy": "#eab308",
  "Consumer harm": "#f97316",
  "Service degradation": "#a855f7",
  "Financial extraction": "#3b82f6",
  "Legal/regulatory": "#22c55e",
};
const tagColor = (t) => TAG_COLORS[t] || "#9a9a9a";

const STATUS_LABELS = {
  "confirmed": "Confirmed",
  "reported-unverified": "Reported",
  "minority-stake": "Minority stake",
  "former": "Former owner",
};

const FIRM_TYPE_LABELS = {
  "PE": "Private equity",
  "growth-equity": "Growth equity",
  "holding-company": "Holding company",
};

const TIER_LABELS = {
  "A": "Tier A — confirmed",
  "B": "Tier B — reported",
  "C": "Tier C — alleged",
};

// ── State ────────────────────────────────────────────────────────────────
let FIRMS = [];
let BUSINESSES = [];
let firmById = {};

const filters = { industry: "", firm: "", tag: "" };
let searchTerm = "";
let sortBy = "firm";
const openCards = new Set();

// ── Helpers ───────────────────────────────────────────────────────────────
const uniqSorted = (arr) =>
  [...new Set(arr.filter(Boolean))].sort((a, b) => a.localeCompare(b));

// Defensive DOM helpers: if an element is missing (e.g. a stale cached HTML
// after a deploy renamed an id), skip it rather than throwing and blanking
// the whole page.
const byId = (id) => document.getElementById(id);
const setText = (id, value) => {
  const el = byId(id);
  if (el) el.textContent = value;
};

// Tags a business inherits from its owning firm (the firm's overall pattern).
function firmTags(b) {
  const f = firmById[b.firm_id];
  return f && Array.isArray(f.tags) ? f.tags : [];
}
// Evidence documented against this specific business (DOJ/AG actions, etc.),
// which may predate the current owner — rendered only on this business.
function bizEvidence(b) {
  return Array.isArray(b.evidence) ? b.evidence : [];
}
// Subtitle under a business name: industry, plus the acquisition year if known.
function cardMeta(b) {
  const bits = [b.industry || "—"];
  if (b.acquisition_date) bits.push(`acquired ${b.acquisition_date}`);
  return bits.join(" · ");
}
// Combined firm + business tags — used for filtering and the tag facet.
function allTags(b) {
  return [...firmTags(b), ...bizEvidence(b)];
}
// Header badges: business evidence first (most specific), deduped by tag name.
function badgeTags(b) {
  const seen = new Set();
  const out = [];
  for (const t of [...bizEvidence(b), ...firmTags(b)]) {
    if (seen.has(t.tag)) continue;
    seen.add(t.tag);
    out.push(t);
  }
  return out;
}

// ── Filtering ───────────────────────────────────────────────────────────────
function getFiltered() {
  let list = BUSINESSES.filter((b) => {
    if (filters.industry && b.industry !== filters.industry) return false;
    if (filters.firm && b.firm_id !== filters.firm) return false;
    if (filters.tag && !allTags(b).some((t) => t.tag === filters.tag)) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const hay = [
        b.name,
        b.firm_name,
        b.industry,
        b.platform_company,
      ].filter(Boolean).join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  if (sortBy === "firm") {
    list.sort((a, b) =>
      (a.firm_name || "~").localeCompare(b.firm_name || "~") ||
      a.name.localeCompare(b.name));
  } else {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }
  return list;
}

// ── Filter bar (industry / owning firm / practice tag) ──────────────────────
function buildSelect(key, label, options) {
  const wrap = document.createElement("label");
  wrap.className = "pe-facet";
  const span = document.createElement("span");
  span.textContent = label;
  const sel = document.createElement("select");
  sel.innerHTML =
    `<option value="">All</option>` +
    options.map((o) => `<option value="${o.value}">${o.label}</option>`).join("");
  sel.value = filters[key];
  sel.addEventListener("change", () => {
    filters[key] = sel.value;
    renderCards();
  });
  wrap.appendChild(span);
  wrap.appendChild(sel);
  return wrap;
}

function renderFilterBar() {
  const bar = byId("pe-filter-bar");
  if (!bar) return;
  bar.innerHTML = "";

  const industries = uniqSorted(BUSINESSES.map((b) => b.industry)).map((i) => ({ value: i, label: i }));
  const firms = [...FIRMS]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((f) => ({ value: f.id, label: f.name }));
  const tagsPresent = uniqSorted([
    ...FIRMS.flatMap((f) => (f.tags || []).map((t) => t.tag)),
    ...BUSINESSES.flatMap((b) => (b.evidence || []).map((t) => t.tag)),
  ]).map((t) => ({ value: t, label: t }));

  bar.appendChild(buildSelect("industry", "Industry", industries));
  bar.appendChild(buildSelect("firm", "Owning firm", firms));
  bar.appendChild(buildSelect("tag", "Practice tag", tagsPresent));

  const clear = document.createElement("button");
  clear.className = "pe-clear";
  clear.textContent = "Clear filters";
  clear.addEventListener("click", () => {
    Object.keys(filters).forEach((k) => (filters[k] = ""));
    searchTerm = "";
    { const si = byId("search-input"); if (si) si.value = ""; }
    renderFilterBar();
    renderCards();
  });
  bar.appendChild(clear);
}

// ── Cards ────────────────────────────────────────────────────────────────
function tagBadge(tag) {
  const c = tagColor(tag.tag);
  const b = document.createElement("span");
  b.className = "badge";
  b.textContent = tag.alleged ? tag.tag + " *" : tag.tag;
  b.style.color = c;
  b.style.borderColor = c + "55";
  b.style.background = c + "11";
  b.title = tag.alleged ? "Alleged / pending" : TIER_LABELS[tag.tier] || "";
  return b;
}

// One evidence/tag row (used for both business evidence and firm practice tags).
function renderViolation(t) {
  const v = document.createElement("div");
  v.className = "violation";
  const c = tagColor(t.tag);
  v.style.setProperty("--dot", c);
  v.innerHTML = `
    <div class="violation-top">
      <div class="violation-title" style="color:${c}">${t.tag}</div>
      <div class="violation-amt-year">
        ${t.alleged ? `<span class="pe-alleged">Alleged / pending</span>` : ""}
        <span class="violation-year">${TIER_LABELS[t.tier] || ""}</span>
      </div>
    </div>
    <div class="violation-detail">${t.description || ""}</div>
    <div class="violation-source">SOURCE: ${t.source_url ? `<a href="${t.source_url}" target="_blank" rel="noopener">${t.source_url}</a>` : "—"}</div>
  `;
  return v;
}

function renderCards() {
  const list = getFiltered();
  const container = byId("card-list");
  if (!container) return; // nothing to render into (shouldn't happen)
  container.innerHTML = "";
  setText("result-count", list.length + (list.length === 1 ? " result" : " results"));

  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "pe-empty";
    empty.textContent = "No businesses match these filters.";
    container.appendChild(empty);
    return;
  }

  list.forEach((b) => {
    const firm = firmById[b.firm_id];
    const fTags = firmTags(b);
    const evid = bizEvidence(b);

    const card = document.createElement("div");
    card.className = "company-card";

    // Header
    const header = document.createElement("div");
    header.className = "card-header";

    const nameBlock = document.createElement("div");
    nameBlock.className = "card-name-block";
    nameBlock.innerHTML = `
      <div class="card-name">${b.name}</div>
      <div class="card-meta">${cardMeta(b)}</div>
    `;

    const badges = document.createElement("div");
    badges.className = "card-badges";
    badgeTags(b).forEach((t) => badges.appendChild(tagBadge(t)));

    const owner = document.createElement("div");
    owner.className = "card-fines pe-owner";
    const ownerLabel = b.ownership_status === "former" ? "former owner" : "current owner";
    owner.innerHTML = `
      <div class="amt">${b.firm_name || "Unknown"}</div>
      <div class="lbl">${ownerLabel}</div>
    `;

    const arrow = document.createElement("div");
    arrow.className = "card-arrow" + (openCards.has(b.id) ? " open" : "");
    arrow.innerHTML = "&#9660;";

    header.appendChild(nameBlock);
    header.appendChild(badges);
    header.appendChild(owner);
    header.appendChild(arrow);

    // Body
    const body = document.createElement("div");
    body.className = "card-body" + (openCards.has(b.id) ? " open" : "");

    const facts = document.createElement("div");
    facts.className = "pe-facts";
    const firmType = firm ? (FIRM_TYPE_LABELS[firm.type] || firm.type) : "";
    const statusLabel = STATUS_LABELS[b.ownership_status] || b.ownership_status || "—";
    facts.innerHTML = `
      <div class="pe-fact"><span>Owning firm</span><div>${b.firm_name || "Unknown"}${firmType ? ` <em>(${firmType})</em>` : ""}${firm && firm.headquarters ? ` — ${firm.headquarters}` : ""}</div></div>
      ${b.platform_company ? `<div class="pe-fact"><span>Operated under</span><div>${b.platform_company}</div></div>` : ""}
      <div class="pe-fact"><span>Acquired</span><div>${b.acquisition_date || "—"}</div></div>
      <div class="pe-fact"><span>Ownership status</span><div><span class="pe-status pe-status-${b.ownership_status || "unknown"}">${statusLabel}</span></div></div>
      <div class="pe-fact"><span>Source</span><div>${b.source_url ? `<a href="${b.source_url}" target="_blank" rel="noopener">View source &#8599;</a>` : "—"}</div></div>
      ${b.last_verified ? `<div class="pe-fact"><span>Last verified</span><div>${b.last_verified}</div></div>` : ""}
    `;
    body.appendChild(facts);

    // Business-specific evidence first — most specific to this chain.
    if (evid.length) {
      const head = document.createElement("div");
      head.className = "pe-tags-head pe-evidence-head";
      head.textContent = `Documented at ${b.name}`;
      body.appendChild(head);
      evid.forEach((t) => body.appendChild(renderViolation(t)));
    }

    // Inherited firm practice record.
    if (fTags.length) {
      const head = document.createElement("div");
      head.className = "pe-tags-head";
      head.textContent = `Firm practice record — ${b.firm_name}`;
      body.appendChild(head);
      fTags.forEach((t) => body.appendChild(renderViolation(t)));
    }

    if (!evid.length && !fTags.length) {
      const none = document.createElement("div");
      none.className = "pe-no-tags";
      none.textContent = "No documented concerns recorded for this business yet.";
      body.appendChild(none);
    }

    header.addEventListener("click", () => {
      if (openCards.has(b.id)) openCards.delete(b.id);
      else openCards.add(b.id);
      arrow.classList.toggle("open");
      body.classList.toggle("open");
    });

    card.appendChild(header);
    card.appendChild(body);
    container.appendChild(card);
  });
}

// ── Stats ────────────────────────────────────────────────────────────────
function renderStats() {
  setText("stat-businesses", BUSINESSES.length);
  setText("stat-firms", FIRMS.length);
  setText("stat-industries", uniqSorted(BUSINESSES.map((b) => b.industry)).length);
}

// ── Wire-up ────────────────────────────────────────────────────────────────
const searchInput = byId("search-input");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    renderCards();
  });
}
document.querySelectorAll(".sort-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    sortBy = btn.dataset.sort;
    document.querySelectorAll(".sort-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderCards();
  });
});

const suggest = document.getElementById("suggest-link");
if (suggest && SUBMISSION_FORM_URL) {
  suggest.href = SUBMISSION_FORM_URL;
  suggest.target = "_blank";
  suggest.rel = "noopener";
}

// ── Load ────────────────────────────────────────────────────────────────
function showLoadError(err) {
  const container = byId("card-list");
  if (container) {
    container.innerHTML =
      `<div class="pe-empty">Couldn't load the dataset (${err.message}). If you're opening this file directly, serve it over a local web server so the browser can fetch pe-data.json.</div>`;
  }
}

// Load is kept separate from render: a genuine fetch/parse failure shows the
// "couldn't load" message (and retries once), while a rendering hiccup — e.g. a
// missing DOM node from a stale cached page — is logged but never masquerades
// as a data-load failure, so the content still comes up.
function loadData(attempt = 0) {
  fetch("pe-data.json", attempt > 0 ? { cache: "reload" } : undefined)
    .then((r) => {
      if (!r.ok) throw new Error(`pe-data.json ${r.status}`);
      return r.json();
    })
    .then((data) => {
      FIRMS = data.firms || [];
      BUSINESSES = data.businesses || [];
      firmById = Object.fromEntries(FIRMS.map((f) => [f.id, f]));
      try {
        renderStats();
        renderFilterBar();
        renderCards();
      } catch (renderErr) {
        // Data is fine; a render step threw (likely a version-skewed cached
        // page). Log it — don't tell the user the dataset failed to load.
        console.error("PE tracker render error:", renderErr);
      }
    })
    .catch((err) => {
      // Transient network/cache blips often clear on a second try; retry once
      // (bypassing cache) before surfacing the error.
      if (attempt < 1) {
        console.warn("pe-data.json load failed, retrying…", err);
        setTimeout(() => loadData(attempt + 1), 1200);
        return;
      }
      console.error(err);
      showLoadError(err);
    });
}
loadData();
