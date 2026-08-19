# Contributing

This is a small, independent site maintained by one person. Contributions are
welcome. This file covers how changes get in and the house rules a change has to
respect. For the editorial rules on sourcing and on which page a company belongs
on, see [`CONTRIBUTING-data.md`](CONTRIBUTING-data.md), which is the authority on
that and is not duplicated here.

## The fastest route is email, not a pull request

For anything that is a wrong sentence, a stale figure, or a document worth reading,
email is faster than a pull request and is preferred:

**visableprivacy@protonmail.com**

- Subject `Correction` for something already published that is wrong or out of date.
  Quote the sentence and link the source that contradicts it.
- Subject `Source` for a primary document worth building on.

Corrections are the most valuable thing anyone sends. Everything here is checked
against a primary document before it goes up, and a second reader still catches what
one reader cannot.

## Pull requests

The repository is public. You may fork it and open a pull request. Nothing merges
without review, and nothing reaches the live site without a maintainer pushing it,
so a pull request is a proposal rather than a change.

Practical notes:

- **Open an issue or email first for anything large.** A new page is a significant
  editorial commitment and is better discussed before it is written than after.
- **One change per pull request.** A typo fix and a new section in the same branch
  are two reviews, not one.
- **No build step exists.** The site is hand-authored static HTML served exactly as
  committed. There is no bundler, no template engine, no package manager, and no CI.
  What you edit is what ships.

## House rules

These are not stylistic preferences. Breaking any of them will get a change
declined regardless of what else it does.

### 1. No third-party requests, ever

The footer of every page reads **"No tracking. No analytics. No ads. Ever."** That
is a public claim, and a single embedded analytics snippet, comment widget, form
script, CDN library, or remote image would make it false.

The only external host currently loaded is Google Fonts. Do not add another. If a
change needs a library, inline it. If it needs a form, link out to it rather than
embedding it.

### 2. No em dashes in rendered files

No `.html`, `.css`, or `.js` file may contain an em dash. Use a full stop, a comma,
or restructure the sentence. Two commits exist solely to strip them.

Check before opening a pull request:

```sh
grep -l '—' *.html *.css *.js
```

This must return nothing. (`tracker.js` is the one historical exception and is being
worked out.) Markdown documentation is not subject to this rule.

### 3. Navigation is duplicated by hand in every file

There is no shared header. The `<nav id="nav">` block is copied into every HTML
file. A new page, or a change to any nav item, means editing **every** `.html` file
in the repository, not just the one you are working on.

After a nav change, verify none were missed:

```sh
grep -L 'href="your-new-page.html"' *.html
```

The same applies to the `<footer class="site-footer">` block.

### 4. Match the existing structure rather than inventing new components

Article pages reuse a fixed set of classes: `.flock-main`, `.dossier-header`,
`.flock-body`, `.flock-block`, `.flock-list`, `.myth-card`, `.hm-note`,
`.hm-table`, `.flock-caveat`. Use them. `style.css` is a single hand-maintained
file and new component CSS should be a last resort, added as a commented block at
the end following the existing per-page convention.

Every `<section class="flock-block">` needs an `aria-labelledby` pointing at its own
`<h2 id="...">`. External links take
`target="_blank" rel="noopener noreferrer"` plus the visible `↗` indicator and the
visually-hidden "(opens in a new tab)" note. Internal links take neither.

### 5. Every factual claim carries its source

Inline links to primary documents, on first mention. No footnotes, no bibliography.
Any figure derived from a query gets the query date written into the prose. Read
`CONTRIBUTING-data.md` before adding a number to any page.

## Verifying a change

There is no test suite. Check by hand:

```sh
python3 -m http.server 8000
```

Then, on every page you touched:

- the nav renders, the Investigations dropdown opens and closes, Escape dismisses it
- the hamburger menu works at mobile width
- the page reads correctly at 375px
- no new external host appears: `grep -o 'https://[^"]*' yourpage.html`

## Licence

Contributions are accepted under the terms in [`LICENSE`](LICENSE): site content
under CC BY 4.0, code under MIT. By opening a pull request you agree your
contribution may be published under those terms.
