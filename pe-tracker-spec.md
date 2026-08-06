# PE Ownership Tracker — Project Spec and Build Prompt

> ⚠️ **Original design spec (historical).** The tracker is built and live; this document captures the
> original intent. For **current state, totals, and the working process, see `pe-tracker-status.md`.**
> The core here still governs — the two-layer model, the evidence standard (Tier A/B/C, "≥ B to
> publish"), the language rule, the tag taxonomy, and the batched research process. Two things have
> since evolved: (1) the **State/City faceted filtering was removed** (all entries are national
> chains — the page now filters by industry / owning firm / practice tag); and (2) a
> **business-level evidence layer was added** (an Airtable `Business Tags` table) so DOJ/FTC/AG
> actions specific to one chain — including conduct predating the current owner — attach to that
> business rather than the firm. Business evidence is now where most of the strongest evidence lives.

## Context (read first)

This is a new feature for **visableprivacy.com** ("Visable"), a privacy and corporate-transparency project by **KindHabitLabs Inc.** (Utah). Visable already has a "corporate dossier" tracker page and a filtering pattern similar to what this feature needs.

**This must be its own dedicated, standalone page** with its own entry in the site navigation (its own label in the header nav on desktop and in the hamburger/dropdown menu on mobile). It is a **separate page from the existing corporate dossier page** and must NOT be merged into, embedded in, or bolted onto the dossier page. "Extends the existing work" here means it belongs to the same project and should reuse Visable's existing styling and filtering patterns for visual consistency. It does not mean it shares the dossier page.

The goal of this feature is to help ordinary people find out which local businesses have been acquired by private equity (PE) firms, growth-equity firms, or holding companies running buyouts and rollups, so they can decide whether to spend their money elsewhere. Think of it as "who really owns your local businesses," with a filterable, well-sourced list.

The valuable asset here is the **dataset**, not the webpage. Build it data-first and machine-readable so the same data can later power an app, an API, or be cited by other tools. The webpage is just the first surface to prove the data is useful.

## Core design principle: two layers

- **Businesses** carry only **facts** (who owns them, when acquired, source link). Low legal risk.
- **Firms** carry the **practice tags** (labor, privacy, etc.), each with its own source.
- A business **inherits** its owning firm's tags. This means tags are maintained once per firm (hundreds of firms) instead of once per business (thousands of entries), and the characterization work stays at the firm level where it can be sourced carefully.

## Scope: what counts as "PE-owned"

- **Include:** majority acquisition or control by a PE firm, growth-equity firm, or holding company running buyouts/rollups. This covers a rollup's platform company and all the locations it has absorbed.
- **Minority stakes:** include but mark with `ownership_status: minority-stake` so control is not overstated.
- **Exclude for v1:** venture-backed startups and ordinary public companies.
- **Fuzzy cases:** do not force-fit. Use the `ownership_status` flag to represent uncertainty.

## Data model

Records are **brand-level**, not one row per physical location. Each business brand is one entry with a list of its locations.

### Business schema

- `id`
- `business_name`
- `locations` (list of objects: `{ city, state, street_address (optional) }`)
- `industry`
- `owning_firm_id` (links to a firm record)
- `platform_company` (the intermediate rollup brand, if any)
- `acquisition_date` (year acceptable if exact date unknown)
- `ownership_status`: `confirmed` | `reported-unverified` | `minority-stake` | `former`
- `source_url` (REQUIRED — no source, no publish)
- `date_added`, `last_verified`, `submitter`

### Firm schema

- `id`
- `firm_name`
- `firm_type`: `PE` | `growth-equity` | `holding-company`
- `headquarters`
- `portfolio_url` (the firm's own site — the best ownership source)
- `practice_tags` (list of objects: `{ tag, evidence_tier, source_url }`)
- `notes`

## Tag taxonomy (attaches to the firm)

1. **Labor** — wage-and-hour violations, union-busting, mass post-acquisition layoffs
2. **Data privacy** — selling customer data, breaches, surveillance practices
3. **Consumer harm** — steep post-acquisition price increases, surprise billing
4. **Service degradation** — staffing cuts, documented quality decline after acquisition
5. **Financial extraction** — dividend recaps, sale-leasebacks, debt-loading, bankruptcies
6. **Legal/regulatory** — significant fraud cases, penalties, agency actions

## Evidence standard (this is what keeps the project defensible)

- **Tier A (confirmed):** court judgment, regulatory finding or penalty, SEC or bankruptcy filing, other primary document.
- **Tier B (reported):** reputable investigative journalism, or the same finding across multiple independent outlets.
- **Tier C (alleged):** pending lawsuit or single-source claim.

Publish rules:
- A tag needs **at least Tier B** to display live.
- **Tier C** may display only with an explicit "alleged/pending" label.
- Nothing below Tier C ever publishes.
- Ownership entries always require a `source_url`.

Language rule: phrase every tag as the documented thing plus the link, never as an accusation. "Subject of DOL wage settlement (link)" is fine. "Exploits workers" is not.

## What to build (v1)

1. A **data store** for the two schemas above (start simple: structured files or a lightweight database; the data must be machine-readable and easy to export).
2. A **new standalone display page** (its own route/URL and its own nav entry in both the desktop header and the mobile hamburger menu) that reuses the existing visableprivacy.com look and the corporate-dossier filtering pattern, showing the businesses as a searchable, filterable list. Do NOT add this to the existing corporate dossier page — it is a separate page.
3. **Faceted filtering** by: state, city, industry, owning firm, and practice tag.
4. Each business entry shows: the owning firm, acquisition date, ownership status, source link, and the firm's inherited practice tags with their sources.
5. A **submission form** so the public can suggest additions without touching the code repo. Submissions go to a **moderation queue** and are NOT published until an admin verifies them against the source. Airtable or Supabase are both fine backends for this.
6. A visible **"last verified" date** on entries, since PE ownership changes over time.

## Out of scope for v1 (note, don't build yet)

- City map view (add later once enough locations are geolocated)
- Native app and public API (the data-first design should make these easy later)
- VC-backed companies

## Data collection approach (top-down, in batches)

Seed the dataset firm-first, not city-first. PE firms publish their portfolio companies on their own websites, so start from those portfolio pages (most accurate, from the source), structure them into the schema above, then let the city and industry filters fall out of the firm data. Bulk fetching of portfolio pages and news sources is well suited to running in the terminal with web access.

**Work in bounded batches, not one open-ended run.** Do NOT attempt to research all firms in a single pass.

- Process **5 to 10 firms per batch**.
- After each batch, **stop and summarize** what was added (firms, business count, any firms that could not be verified). Do not automatically continue to the next batch. Wait for a go-ahead so each batch can be spot-checked (source links and schema) before moving on.
- Reasons: it prevents runaway sessions and context-limit cutoffs, keeps evidence-tier rigor consistent instead of drifting as the list grows, and produces reviewable checkpoints instead of a large block of unverified output.

**Which firms first:** prioritize the largest, most acquisitive rollups in the consumer-facing categories most people interact with — for example veterinary clinics, dental groups, HVAC, car washes, gyms, and restaurants. These have the most PE activity and the widest public impact.
