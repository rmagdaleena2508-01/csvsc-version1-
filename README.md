# CSI Student Chapter — SRMIST Vadapalani

The official site of the Computer Society of India Student Chapter at SRMIST
Vadapalani.

**Live:** https://rmagdaleena2508-01.github.io/csvsc-version1-/

---

## Why this exists

Most college club websites are noticeboards. They list an event, go quiet for a
term, and leave nothing behind. The chapter had the opposite problem: real
sessions were happening, with real speakers, and the only trace of them was a
poster in a WhatsApp group that scrolled away in a week.

So this site is built as a **record**, not an announcement board. Every session
keeps its poster, its speaker, its venue and what it covered. A student who
finds the chapter in their third year can see what the second year did. A
speaker can point at a page. A faculty coordinator can use it as documentation.
Next year's office bearers inherit something they can add to rather than
rebuild.

Two smaller goals shaped it as much as that one:

- **It had to look like it was made on purpose.** Students judge a chapter by
  its front page. A template with a stock hero says nobody cared.
- **It had to survive a handover.** Whoever holds this next may not write React.
  Adding a session should mean editing one file, not touching a component.

## Why it looks the way it does

**Editorial, not dashboard.** Big type, wide margins, a small number of things
per screen. Club sites usually fail by cramming — six widgets and a carousel
above the fold. Restraint reads as confidence, and it costs nothing to build.

**One idea per screen.** The hero says who we are. The next section says what is
happening now. Then evidence, then people, then ideas. A visitor who leaves
after two screens still knows what the chapter is.

**Photographs carry the credibility.** Not illustrations, not icons. A packed
lab with a speaker mid-talk proves more than any adjective. The real posters are
shown whole, uncropped, because the poster *is* the record.

**Type does the work.** Four faces, each with a job:
Instrument Sans carries the interface, Playfair Display gives section headings
an editorial weight, Inter picks out single words for contrast, and Great Vibes
handles the two accent words in the hero. Colour stays almost entirely navy on
cream, so hierarchy comes from size and space instead of decoration.

**Motion indicates hierarchy, it does not decorate.** A 20px fade-and-rise as
sections enter. A metallic edge on the cards that shifts as the page scrolls and
holds still when it stops. A fixed-duration scroll for in-page jumps, because
the browser's own smooth scroll stretches with distance and a jump to the bottom
of the page starts to feel broken. Everything collapses to static under
`prefers-reduced-motion`.

## Why this stack

| Choice | Reason |
| --- | --- |
| **Next.js 16, App Router** | Every route prerenders to static HTML. No server, no database, no runtime cost, and the whole site can be hosted free on GitHub Pages. File-based routing means `/events/[slug]` comes from a data file rather than a router config. |
| **React 19 + TypeScript** | Types are the handover documentation. `ChapterEvent` tells the next maintainer exactly which fields an event needs, and the build fails if one is missing — better than discovering it in production. |
| **Tailwind CSS 4** | Design tokens live in one `@theme` block: palette, fluid type scale, spacing rhythm, easing. Changing the brand is editing a dozen lines, not hunting through stylesheets. Styling next to the markup also means deleting a component deletes its CSS. |
| **Motion (Framer Motion)** | Used for exactly two things: scroll reveals and the college dialog. Everything else is CSS. A whole animation library for a fade would not be worth its bytes. |
| **next/font** | Fonts are self-hosted and inlined at build time. No render-blocking request to Google, no layout shift when they land. |
| **Static export** | Nothing to keep running, nothing to pay for, nothing to patch. A student site should still be up in three years without anyone maintaining a server. |
| **No CMS** | A CMS is a login, a subscription and an account handover. Content lives in typed files in the repo, so editing is a pull request and the history is the audit trail. |

## Content lives in data, not components

Nothing that reads as copy is written into a component. To change the site, edit
these:

| File | Holds |
| --- | --- |
| `data/site.ts` | Chapter name, canonical URL, social links, navigation |
| `data/events.ts` | Every session, and which one is `featured` |
| `data/team.ts` | Office bearers, faculty first |
| `data/insights.ts` | The "Ideas worth taking with you" entries |

Adding an event to `data/events.ts` creates its card, its `/events/[slug]` page,
its metadata and its sitemap entry. No other file changes.

A team member with no `name` renders as a quiet "Announcing soon" card on
purpose, so the grid stays whole while a position is being filled. Categories
listed in `upcomingCategories` show a coming-soon notice instead of an empty
grid.

## Running it

```bash
npm install
npm run dev     # http://localhost:8790
npm run build
npm run lint
```

## Deploying

Two targets from one config, switched by environment variables.

**GitHub Pages** is automatic: pushing to `main` runs
`.github/workflows/deploy-pages.yml`, which builds a static export under the
repository's subpath and publishes it.

**Vercel**: import the repository and deploy with no settings changed.

| Variable | Pages | Vercel |
| --- | --- | --- |
| `STATIC_EXPORT` | `true` | unset |
| `NEXT_PUBLIC_BASE_PATH` | `/csvsc-version1-` | unset |
| `NEXT_PUBLIC_SITE_URL` | the Pages URL | the production domain |

Anything hand-written that points at `/public` — a raw `<img>`, a CSS `url()` —
must go through `asset()` in `lib/asset.ts`, or it will 404 under the Pages
subpath. `next/image` and `next/link` handle it themselves.

## Images

`lib/media.ts` decides per file: vector art is served straight from `/public`,
since the optimizer cannot improve an SVG, while photographs go through
`next/image` for AVIF and WebP. The `Img` wrapper in `components/ui/Img.tsx`
applies both that rule and the base path, because `next/image` only rewrites
paths for images it optimizes.

Two scripts prepare the brand art:

```bash
python3 scripts/prepare-brand.py      # knocks white out of the two seals, resizes the skies
python3 scripts/knockout-credit.py <image>   # lifts the handwritten credit off its background
```

Both need Pillow and numpy. Sources live in `scripts/source/`.

## Accessibility

Semantic landmarks, a skip link, a visible focus ring on every interactive
element, `aria-current` on the active navigation item, dialog focus management,
and body text held at or above the 4.5:1 contrast ratio against the cream
background. Every animation on the site is skipped under
`prefers-reduced-motion`.

## Artwork

Everything visual on the site is the chapter's own.

- **Hero sky** — generated by R. Magdaleena using ChatGPT 5.6 Sol, then art
  directed into two crops: a tall one for phones, a wide one for laptops, so a
  device only downloads the frame it needs.
- **Session photographs** — taken at the sessions themselves.
- **Event posters** — the chapter's own announcement posters, shown whole and
  uncropped, because the poster is the record.
- **Handwritten credit** — written by hand, then lifted off its background by
  `scripts/knockout-credit.py` and repainted in the palette navy.

## Still to fill in

- Speaker names on the older event records
- Per-session LinkedIn links for the insights

---

Designed and developed by R. Magdaleena, Vice President, CSI Student Chapter,
SRMIST Vadapalani.
