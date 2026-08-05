// PE Ownership Tracker — reads pe-data.json (generated from Airtable by
// export-pe-data.mjs) and renders a faceted, filterable list of businesses.
//
// Two-layer model: businesses carry facts + a firm_id; firms carry the
// practice tags. A business inherits its owning firm's tags at render time,
// so tags are looked up via firmById[business.firm_id], never stored per row.

// Paste your Airtable submission Form's share URL here to wire up the
// "Suggest an addition" link. Leave "" to fall back to an email/quiet link.
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

const filters = { state: "", city: "", industry: "", firm: "", tag: "" };
let searchTerm = "";
let sortBy = "firm";
const openCards = new Set();

// ── Helpers ───────────────────────────────────────────────────────────────
const uniqSorted = (arr) =>
  [...new Set(arr.filter(Boolean))].sort((a, b) => a.localeCompare(b));

function businessTags(b) {
  const f = firmById[b.firm_id];
  return f && Array.isArray(f.tags) ? f.tags : [];
}

function locationSummary(b) {
  if (!b.locations || !b.locations.length) return "location data pending";
  const states = uniqSorted(b.locations.map((l) => l.state));
  const n = b.locations.length;
  const stateBit = states.length ? ` · ${states.length} state${states.length === 1 ? "" : "s"}` : "";
  return `${n} location${n === 1 ? "" : "s"}${stateBit}`;
}

// ── Filtering ───────────────────────────────────────────────────────────────
function getFiltered() {
  let list = BUSINESSES.filter((b) => {
    if (filters.industry && b.industry !== filters.industry) return false;
    if (filters.firm && b.firm_id !== filters.firm) return false;
    if (filters.state && !(b.locations || []).some((l) => l.state === filters.state)) return false;
    if (filters.city && !(b.locations || []).some((l) => l.city === filters.city)) return false;
    if (filters.tag && !businessTags(b).some((t) => t.tag === filters.tag)) return false;

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

// ── Filter bar (five facets) ────────────────────────────────────────────────
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
  const bar = document.getElementById("pe-filter-bar");
  bar.innerHTML = "";

  const allLocs = BUSINESSES.flatMap((b) => b.locations || []);
  const states = uniqSorted(allLocs.map((l) => l.state)).map((s) => ({ value: s, label: s }));
  const cities = uniqSorted(allLocs.map((l) => l.city)).map((c) => ({ value: c, label: c }));
  const industries = uniqSorted(BUSINESSES.map((b) => b.industry)).map((i) => ({ value: i, label: i }));
  const firms = [...FIRMS]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((f) => ({ value: f.id, label: f.name }));
  const tagsPresent = uniqSorted(FIRMS.flatMap((f) => (f.tags || []).map((t) => t.tag)))
    .map((t) => ({ value: t, label: t }));

  bar.appendChild(buildSelect("state", "State", states));
  bar.appendChild(buildSelect("city", "City", cities));
  bar.appendChild(buildSelect("industry", "Industry", industries));
  bar.appendChild(buildSelect("firm", "Owning firm", firms));
  bar.appendChild(buildSelect("tag", "Practice tag", tagsPresent));

  const clear = document.createElement("button");
  clear.className = "pe-clear";
  clear.textContent = "Clear filters";
  clear.addEventListener("click", () => {
    Object.keys(filters).forEach((k) => (filters[k] = ""));
    searchTerm = "";
    document.getElementById("search-input").value = "";
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

function renderCards() {
  const list = getFiltered();
  const container = document.getElementById("card-list");
  container.innerHTML = "";
  document.getElementById("result-count").textContent =
    list.length + (list.length === 1 ? " result" : " results");

  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "pe-empty";
    empty.textContent = "No businesses match these filters.";
    container.appendChild(empty);
    return;
  }

  list.forEach((b) => {
    const firm = firmById[b.firm_id];
    const tags = businessTags(b);

    const card = document.createElement("div");
    card.className = "company-card";

    // Header
    const header = document.createElement("div");
    header.className = "card-header";

    const nameBlock = document.createElement("div");
    nameBlock.className = "card-name-block";
    nameBlock.innerHTML = `
      <div class="card-name">${b.name}</div>
      <div class="card-meta">${b.industry || "—"} &middot; ${locationSummary(b)}</div>
    `;

    const badges = document.createElement("div");
    badges.className = "card-badges";
    tags.forEach((t) => badges.appendChild(tagBadge(t)));

    const owner = document.createElement("div");
    owner.className = "card-fines pe-owner";
    owner.innerHTML = `
      <div class="amt">${b.firm_name || "Unknown"}</div>
      <div class="lbl">current owner</div>
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

    if (tags.length) {
      const tagsHead = document.createElement("div");
      tagsHead.className = "pe-tags-head";
      tagsHead.textContent = `Practice record — ${b.firm_name}`;
      body.appendChild(tagsHead);

      tags.forEach((t) => {
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
        body.appendChild(v);
      });
    } else {
      const none = document.createElement("div");
      none.className = "pe-no-tags";
      none.textContent = "No documented practice concerns recorded for this firm yet.";
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
  document.getElementById("stat-businesses").textContent = BUSINESSES.length;
  document.getElementById("stat-firms").textContent = FIRMS.length;
  const states = uniqSorted(BUSINESSES.flatMap((b) => (b.locations || []).map((l) => l.state)));
  document.getElementById("stat-states").textContent = states.length;
}

// ── Wire-up ────────────────────────────────────────────────────────────────
document.getElementById("search-input").addEventListener("input", (e) => {
  searchTerm = e.target.value;
  renderCards();
});
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
fetch("pe-data.json")
  .then((r) => {
    if (!r.ok) throw new Error(`pe-data.json ${r.status}`);
    return r.json();
  })
  .then((data) => {
    FIRMS = data.firms || [];
    BUSINESSES = data.businesses || [];
    firmById = Object.fromEntries(FIRMS.map((f) => [f.id, f]));
    renderStats();
    renderFilterBar();
    renderCards();
  })
  .catch((err) => {
    console.error(err);
    document.getElementById("card-list").innerHTML =
      `<div class="pe-empty">Couldn't load the dataset (${err.message}). If you're opening this file directly, serve it over a local web server so the browser can fetch pe-data.json.</div>`;
  });
