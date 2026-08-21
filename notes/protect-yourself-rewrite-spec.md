# Protect Yourself → Harm Reduction: Rewrite Spec

## Task

Rewrite the "Protect Yourself" section of visableprivacy.com. This is a content and
structure rewrite, not a redesign. Keep the existing visual system.

**Before writing any code:** locate the current section, read it, and report back
what file(s) it lives in and how it's structured. Do not guess at filenames.

## The problem with the current section

It inherited the privacy industry's pitch: tools presented as *protection* —
binary, permanent, solved. The tools are actually *mitigation* — partial,
ongoing, leaky. That gap between promise and reality is what produces learned
helplessness in readers. It is the same failure mode as abstinence-only sex ed:
an unrealistic standard that, when it inevitably fails, teaches people that
nothing works.

The site's whole thesis is that people rationalize privacy inaction. The current
section feeds that rationalization.

## The reframe

Harm reduction. Every claim on the page must match the mechanism behind it.

Three rules govern all copy in this section:

1. **Never say a tool protects you.** Say what it stops and what it doesn't.
2. **Distinguish one-time actions from treadmills.** A permanent fix and a
   subscription that must be re-run every 60 days are not the same product, and
   the reader deserves to know which they're buying.
3. **Match the tool to the threat.** Most privacy advice fails because it treats
   "privacy" as one blob. Ad-tech profiling, credential stuffing, and a stalker
   looking up your address are three different problems with three different
   answers.

## Structure to build

Six blocks, in this order.

### 1. Opening frame

Replace the "Protect Yourself" heading. That phrasing concedes the premise —
that this is your job to solve alone. Propose 2–3 alternative headings and let
the user pick. Candidates to start from: "What Actually Works," "Harm
Reduction," "Honest Mitigation."

Two or three short paragraphs. State plainly: nothing on this page solves the
problem. Everything on it reduces specific harm by a specific amount. Name the
abstinence-only comparison directly — it is the clearest way to explain why the
usual advice fails, and it earns trust by admitting the limitation before the
reader finds it.

### 2. The three actions

The realistic ask. Assume the reader will do three things, ever, and never
revisit them. Rank by harm prevented per minute spent.

1. Password manager, unique passwords, 2FA on email and bank first.
2. uBlock Origin.
3. An email alias service for every new signup from today forward.

For each: what it stops, roughly how long setup takes, and whether it's
one-time. Do not pad this list to five or ten items. The shortness is the point.

Name specific products only where there's a clear, non-affiliate,
non-crypto-entangled choice. Where there isn't, describe the category and say
why the site isn't picking a winner.

### 3. The honest tool table

A comparison table. Columns: Tool / What it stops / What it doesn't / One-time
or ongoing.

Rows to cover, at minimum:

- **VPN** — stops your ISP and local network seeing destinations. Doesn't touch
  anything Google, Meta, or your logged-in accounts do. It moves trust to the
  VPN company; it does not remove trust from the equation.
- **Tor** — unlinks you from a destination for a session. Slow. Wrong tool for
  daily life.
- **Data removal services (DeleteMe, Optery, etc.)** — shrinks people-search
  surface. Real value against a person hunting you. Does nothing about ad tech
  or the upstream sources that refill the brokers, which is why it's a
  subscription and not a fix.
- **Password manager + 2FA** — stops account takeover, the most common concrete
  harm that actually happens to people. Does nothing about collection.
- **uBlock Origin** — most third-party tracking. Not first-party, not in-app.
- **Email aliases** — stops future accumulation permanently. Doesn't touch what's
  already out there.

The "one-time or ongoing" column is the most valuable thing on the page. Do not
soften it.

### 4. If someone is specifically looking for you

A separate, clearly-marked escalation path. Stalking, harassment, doxxing,
domestic violence, being a public-facing person. This is the one case where
paid data-removal services genuinely earn their price, and the section should
say so plainly after having been skeptical of them above.

Keep it short and link out to specialists rather than trying to be
comprehensive. Leave a `TODO:` for the user to select the right organizations —
do not pick these yourself.

### 5. If you want to go further

Brief. Tor, hardened browsers, compartmentalized identities. Frame explicitly as
"this is for a threat model most readers don't have."

Optional: Nym/NymVPN may appear here as a *contrast example* — a tool that is
honest about its narrow scope — not as a recommendation. If included, disclose
that it has an associated crypto token. If that framing feels like a tangent
when drafted, cut it.

### 6. The civic close

The most important block. Everything above is triage. The actual fix is legal,
not personal — data brokers exist because it is legal for them to exist, and
"protect yourself" quietly concedes that and makes it your job to mop.

Close with concrete civic action. Leave a `TODO:` for the user to supply the
specific asks and links; do not invent legislative or organizational details.

## Copy rules

- Second person. Short declarative sentences. No hedging.
- No fear-mongering and no reassurance. Both are dishonest here.
- No jargon without a definition in the same sentence.
- Assume a smart reader with no technical background and about four minutes.
- **Do not invent statistics, percentages, breach counts, or dollar figures.**
  Where a number would strengthen a claim, write `TODO: source needed — [claim]`
  and move on. This applies to plausible-sounding numbers too.
- No affiliate links. If any exist in the current section, flag them.

## Design constraints

- Preserve the existing dark editorial aesthetic.
- Cormorant Garamond for headings, Space Grotesk for body. Do not introduce new
  typefaces.
- Reuse existing component patterns and CSS from elsewhere in the site rather
  than writing new one-off styles. If the tool table needs a new pattern, look
  at how the Corporate Dossier tables are built and match them.
- Table must be readable on mobile. Card-per-row collapse is fine.
- No new JS dependencies.

## Working method

Bounded, with checkpoints. Do not build the whole thing in one pass.

1. Read the current section. Report the file structure and anything worth
   salvaging. **Stop.**
2. Draft the copy for all six blocks as markdown. No HTML yet. **Stop for
   review.**
3. Build the HTML/CSS once copy is approved.
4. List every `TODO:` marker left in the file at the end.

Flag disagreements rather than working around them. If a block seems wrong once
you're inside the actual page, say so before building it.
