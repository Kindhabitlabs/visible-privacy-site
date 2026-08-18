# PE Ownership Tracker — Status & Briefing

_Last updated: 2026-08-06. This is the resume-here doc: read this + `pe-tracker-spec.md` and you're caught up._

## What it is
A standalone, sourced, filterable page on visableprivacy.com (static GitHub Pages site,
plain HTML/CSS/JS, no build step, no backend) showing which local businesses are owned by
private-equity / holding companies — with defensible, tiered evidence. Live at
**visableprivacy.com/pe-tracker.html**.

## Current status (LIVE on `main`)
- **52 firms / 76 businesses / 10 firm tags / 70 business evidence / 15 industries.**
- Industries: Veterinary, Home Services (HVAC), Dental, Emergency medicine, Nursing homes,
  Hospice, Single-family rentals, Apartments, Mobile home parks, Newspapers,
  Broadcast & digital media, Retail & restaurants, Insurance, Dating apps,
  Care marketplaces.
- **Batch 16 added a scoped exception to the no-public-companies rule.** Match Group and
  IAC are entered with `firm_type: "public-company"` (renders as "Publicly traded")
  because the story there is concentration: one company holds Tinder, Hinge, Match.com,
  OkCupid and Plenty of Fish. The exception does NOT reopen Nexstar, Chemed, Amedisys,
  DR Horton or AssuredPartners. Note: IAC has not owned Match Group since the separation
  completed June 30, 2020.
- Everything pushed; branch is `main`, fully synced with origin.
- Only held-back record: **Blue River PetCare** (`reported-unverified`, kept pending).

## Architecture / pipeline
Airtable (source of truth) → export script → `pe-data.json` → the page reads it.

- **Airtable** base `appH6PBGeN9oVJ5a0` ("PE-tracker"), 5 tables:
  - `Firms` — firm_id, firm_name, firm_type (PE/growth-equity/holding-company), headquarters, portfolio_url, notes
  - `Firm Tags` — firm (link), tag, evidence_tier (A/B/C, descriptive labels OK), description, source_url, publish
  - `Businesses` — business_id, business_name, industry (**Single line TEXT**), owning_firm_id (link), platform_company, acquisition_date, ownership_status, source_url, last_verified, review_status, submitter
  - `Business Tags` — business (link), tag, evidence_tier, description, source_url, publish  ← per-business evidence
  - `locations` — dormant (all national chains; not used by the page)
- Token + base id live in gitignored `.env` (`AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`). Node 18+/20.6+.

## Two-layer evidence model
- **Firm tags** live on a firm and are inherited by ALL its businesses (the firm's overall pattern).
- **Business evidence** (`Business Tags`) lives on one business only — for DOJ/AG/FTC actions
  specific to a chain, including conduct that predates the current PE owner. This is where most
  of the strong evidence goes.
- Page renders "Documented at <business>" (business evidence, gold header) ABOVE
  "Firm practice record — <firm>" (inherited firm tags).
- **Evidence tiers:** A = confirmed/primary doc (DOJ/FTC/AG/court); B = reported/journalism/
  congressional inquiry; C = alleged/pending (shown with an "alleged" label). Need ≥ B + `publish`✓
  to display.
- **ownership_status:** confirmed | reported-unverified | minority-stake | former. `former` is used
  for landmark PE cases the firm has exited (Envision/KKR, Invitation Homes/Blackstone, HCR
  ManorCare/Carlyle, iHeart/Bain, Gannett/Fortress, most of the retail batch).

## How to add a batch (the established workflow)
1. **Research** 5–10 firms in one vertical with real sources (WebSearch/WebFetch). Prefer Tier A
   anchors (DOJ/FTC/AG). Confirm current PE ownership (it's often layered/opaque).
2. **Stop and summarize** for the user's spot-check before building (never one giant run).
3. Write `batches/batch-NN-<vertical>.json` (see any existing batch file for shape; firms carry
   optional `tags[]`, businesses carry optional `evidence[]` and optional `locations[]`).
4. **Dry-run:** `node --env-file=.env import-to-airtable.mjs batches/batch-NN-*.json`
5. **Commit to Airtable:** add `--commit`. Lands as `review_status=pending`, evidence `publish=true`
   but still gated. Importer dedups firms/businesses by slug and evidence by business+tag+source+desc
   (idempotent). Evidence attaches to existing businesses too.
6. Commit the batch file to git.
7. **User verifies** in Airtable → flips `review_status`→`verified`, checks evidence `publish`✓.
8. **Export:** `node --env-file=.env export-pe-data.mjs` → writes `pe-data.json`.
9. Commit `pe-data.json` + push to `main` (GitHub Pages auto-deploys; ~2 min).

Batches can be stacked: import several + commit files, then ONE export + push at the end. The final
export only publishes `verified` businesses, so verify everything first.

## Key conventions & gotchas
- **`industry` is a TEXT field** in Airtable (was single-select, hit a ~7-option cap). Keep spelling
  consistent across batch JSON so the facet stays clean.
- **Cross-vertical firm-tag bleed:** a firm's tags inherit onto every business it owns. When a firm
  spans industries (KKR, Blackstone, Leonard Green, Bain…), route a business to a co-owner WITHOUT
  firm tags, or keep evidence at the business level, to avoid a wrong tag showing. (E.g., Aspen routed
  via Ares; Toys R Us via Bain not KKR.)
- Prefer **business-level evidence** for anything chain-specific or predating current ownership.
- **Don't attach industry-level findings** (academic studies, broad congressional reports) to a single
  firm — they have no honest home in the model (noted, not attached).
- Airtable base-id must be the bare `app…` id; a missing table returns **403** (not 404), handled as
  optional; new Airtable tables ship with 3 blank default rows that export-skip harmlessly.
- Exclude **public companies** (not PE): e.g., DR Horton, VITAS/Chemed, Amedisys, Nexstar, big
  cable/network conglomerates. Note them as excluded.

## Files
- `pe-tracker.html` / `pe-tracker.js` / `style.css` — the page (facets: industry / owning firm /
  practice tag + search + sort; stats: Businesses / Owning Firms / Industries). Page is hardened
  against DOM/cache version-skew (defensive byId/setText; load split from render; one fetch retry).
- `export-pe-data.mjs` — Airtable → `pe-data.json`.
- `import-to-airtable.mjs` — batch JSON → Airtable (dry-run default; `--commit` to write).
- `batches/batch-01..13-*.json` — source-of-truth batch files.
- `pe-tracker-spec.md` — original feature spec.
- `.env` — gitignored secrets.

## Candidate next verticals (not yet done)
- **Hospitals — Steward Health Care / Cerberus** (2024 bankruptcy scandal, Senate probe) — biggest gap.
- **Air/ground ambulance — Global Medical Response / KKR** (surprise billing).
- **Anesthesia — US Anesthesia Partners / Welsh Carson** (FTC antitrust; ready-made Tier A).
- Dermatology / ophthalmology / GI / fertility rollups; behavioral health & autism (ABA); radiology;
  urgent care; prison services (Securus/Platinum Equity; Corizon-YesCare); for-profit colleges.

## Open items
- Blue River PetCare: re-confirm owner, then verify + re-export.
- Delete the 3 blank default rows in the `Business Tags` table (cosmetic).
- Optional future: a per-industry "context strip" on the page to surface industry-level findings
  (nursing-home mortality study, RealPage-adjacent research, news-deserts, etc.) that currently
  have no per-firm home.
