# Which page does this go on?

This site has two data-driven accountability pages that look similar and are easy to
confuse. They answer different questions. Put a company in the wrong one and the page stops
making its argument.

Read this before adding a company to either.

| | **Corporate Dossier** | **PE Ownership Tracker** |
|---|---|---|
| Page | `tracker.html` + `tracker.js` | `pe-tracker.html` + `pe-tracker.js` |
| Question it answers | *What has this company been caught doing?* | *Who actually owns this business?* |
| Unit of record | A company and its violations | A business and its owning firm |
| Entry threshold | A documented enforcement action, settlement, verdict, or serious investigative finding | A verifiable ownership relationship |
| Data source | The `COMPANIES` array literal in `tracker.js` | Airtable, exported to `pe-data.json` |
| Public companies | **Yes.** Most entries are public companies | **No.** That is the whole point of the page |

## The one-line test

**Is the story a wrongdoing, or an owner?**

A documented fine with no private equity owner behind it is a **dossier** entry. A private
equity firm quietly acquiring something you use is a **tracker** entry, even when nobody has
been fined for anything.

Some companies legitimately belong on both, for different reasons. Grindr is the model: the
dossier carries its Norwegian data protection fine, the tracker carries the fact that it was
sold out of Chinese ownership under a CFIUS order and is now controlled by two investors.
Neither page repeats the other's material.

## How we got this wrong

In August 2026 we added Match Group and IAC to the **PE tracker**, inventing a
`public-company` firm type to make them fit, on the reasoning that one company holding
Tinder, Hinge, Match.com, OkCupid and Plenty of Fish is a concentration story worth telling.

Match Group was already in the dossier. Nobody checked.

It also required breaking the tracker's stated no-public-companies rule, which had been
applied consistently to DR Horton, Chemed, Amedisys, Nexstar and AssuredPartners. Inventing a
new schema value to fit a record into a page is a strong signal that it belongs on the other
page. The change was reversed the same day. See `batches/batch-16-match-iac.json` for the
full write-up.

**Check both pages before adding a company to either.**

## Corporate Dossier specifics

The data is the `COMPANIES` array literal at the top of `tracker.js`. No Airtable, no export
step, no build. The page's two header stats compute from the array, so `tracker.html` almost
never needs editing when a company is added.

- `fineRaw` is in **billions** and drives the sort and the total. Entries with no monetary
  penalty use `fineRaw: 0` and a descriptive `totalFines` string like
  `"No fine — FTC order"`.
- Violations carry no category of their own; categories live on the company.
- Adding a violation to an existing company is as valuable as adding a new company. **Read
  the existing entry first** — Meta nearly got a duplicate of the Texas biometric settlement.
- Keep the page privacy-led, but deliberately refill the thin categories. As of August 2026
  `privacy` holds 42 of 67 companies, while `antitrust` (6) and `environmental` (8) are thin.
- `tracker.js` is **exempt** from the site's no-em-dash rule, which covers the HTML pages
  only. Existing dossier copy uses em dashes freely; match it.

**Gotcha:** `tracker.js` has two top-level arrays. Splicing before the *first* `^];` lands in
`CATEGORIES`, not `COMPANIES`, and still passes `node --check`. Anchor off
`];\n\nfunction categoryColor`.

## PE Ownership Tracker specifics

Airtable is the source of truth. See `pe-tracker-status.md` for the full pipeline, the
two-layer evidence model, and the batch workflow.

- **Firm tags inherit onto every business the firm owns.** For anything chain-specific, or
  any conduct predating the current owner, use business-level evidence instead.
- To remove a business without destroying it, set `review_status` to `excluded`. The export
  gates on `verified`, and only emits firms referenced by a published business, so orphaned
  firms drop automatically.
- Industry is a free-text field. Keep spelling consistent or the facet fragments.

## Sourcing rules, for both pages

These are not optional. Two fabricated figures have made it onto the live site.

**Never write a number from a search-result summary.** Search engines will confidently
restate a figure that exists on exactly one junk domain. Open the primary source and read it.

- A dossier entry claimed a **$20M FTC settlement with Grindr in 2026**. No such settlement
  exists. The figure traced to a single SEO content farm; EPIC's 2023 complaint asked the FTC
  to investigate and nothing followed. The same entry cited Norway's fine as $11.7M, which was
  the *intended* penalty announced in January 2021, not the NOK 65M actually imposed.
- An earlier draft claimed a **$2.5B Walmart FTC subscription settlement**. Also fictional.
  The real action is $100M over Spark Driver pay and tips.

**Practical mechanics.** `ftc.gov` and most agency sites return 403 to automated fetchers but
200 to `curl` with a browser User-Agent:

```
curl -sL -A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36" <url>
```

Agency press releases are the gold standard: ftc.gov, justice.gov, state AG sites,
datatilsynet.no, cppa.ca.gov. Court dockets and company disclosures next. Investigative
journalism is acceptable for findings that never became enforcement actions, but say so in
the text.

**Distinguish these three states in the copy, always:**

1. A **complaint or lawsuit** — an allegation, untested.
2. An **order or settlement** — resolved, usually without an admission.
3. A **verdict or judgment** — decided by a court.

Write "no fine" plainly when an order carries no money. Do not let a reader infer a penalty
that was never imposed.

## Verifying a change

```
node --check tracker.js
```

Then evaluate the array and assert the invariants: expected company count, no duplicate
`name` values, every `categories` id present in `CATEGORIES`, every violation carrying
`title` / `amount` / `year` / `detail` / `source`, and `fineRaw` a real number on every entry.

For the PE tracker, run the export and read its summary. It prints every skipped business
with the reason, which is the fastest way to catch a record that silently failed to publish.
