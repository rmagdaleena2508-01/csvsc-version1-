# CSI Student Chapter — SRMIST Vadapalani

Official site for the Computer Society of India Student Chapter at SRMIST
Vadapalani. Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 ·
Motion. Every route is statically prerendered.

```bash
npm install
npm run dev     # http://localhost:8790
npm run build   # static prerender of every route
npm run lint
```

## Deploying

Two targets from one config, switched by environment variables.

**GitHub Pages** — automatic. Pushing to `main` runs
`.github/workflows/deploy-pages.yml`, which builds a static export under the
repository's subpath and publishes it:

```
https://rmagdaleena2508-01.github.io/csvsc-version1-/
```

**Vercel** — import the repository and deploy with no settings changed. Leave
`STATIC_EXPORT` and `NEXT_PUBLIC_BASE_PATH` unset so the site builds at the
domain root with the image optimizer on, and set `NEXT_PUBLIC_SITE_URL` to the
production domain so canonical tags, Open Graph and the sitemap point at it.

| Variable | Pages | Vercel |
| --- | --- | --- |
| `STATIC_EXPORT` | `true` | unset |
| `NEXT_PUBLIC_BASE_PATH` | `/csvsc-version1-` | unset |
| `NEXT_PUBLIC_SITE_URL` | the Pages URL | the production domain |

Anything hand-written that points at `/public` — a raw `<img>`, a CSS `url()` —
must go through `asset()` in `lib/asset.ts`, or it will 404 under the Pages
subpath. `next/image` and `next/link` handle it themselves.

## Where the content lives

Nothing that reads as copy is hardcoded in a component. Edit these files:

| File | Holds |
| --- | --- |
| `data/site.ts` | Chapter name, canonical URL, social links, nav items |
| `data/events.ts` | Every session, plus which one is `featured: true` |
| `data/team.ts` | Office bearers and faculty |
| `data/insights.ts` | The "Ideas worth taking with you" entries |

Adding an event to `data/events.ts` creates its card, its `/events/[slug]`
page, its metadata and its sitemap entry — no other file changes.

A team member with no `name` renders as a quiet "Announcing soon" card on
purpose, so the grid stays complete while positions are being filled.

## Placeholder content that must be replaced

Everything below is scaffolding, not fact:

- **Team names.** Only the Vice President entry is real. Every other position in
  `data/team.ts` is deliberately blank. Fill them in — do not invent them.
- **Speakers.** `data/events.ts` uses generic values ("Guest Speaker",
  "Industry Panel"). Replace with the actual names and roles.
- **Social URLs** in `data/site.ts` and **`site.url`** are guesses. Point them at
  the real accounts and domain before publishing — `site.url` feeds canonical
  tags, Open Graph and the sitemap.
- **Photography.** Event, moment and portrait images under `public/images/` are
  still generated vector placeholders from `scripts/gen-assets.mjs`. Drop real
  photographs in at the same paths and update the `image` / `gallery` fields.

## Brand art

The hero uses the chapter's own assets, prepared once from the originals in
`scripts/source/`:

| Output | From | Used by |
| --- | --- | --- |
| `csi-emblem.png` | `csi-logo.jpeg` | Hero, nav, footer, About |
| `srmist-seal.png` | `srmist-logo.jpeg` | Nav |
| `sky-wide.jpg` | `sky-wide.jpeg` | Hero, 768px and up |
| `sky-tall.jpg` | `sky-tall.jpeg` | Hero, phones |

`scripts/prepare-brand.py` knocks the white background out of the two marks
(globally for the CSI emblem so the sky shows through it, edges-only for the
SRMIST seal so its white field survives), trims each to its bounding box, and
resizes the two skies. Replace a file in `scripts/source/` and rerun:

```bash
python3 scripts/prepare-brand.py    # needs Pillow
```

The hero picks its sky with a `<picture>` element, so a phone downloads only
the tall crop and a laptop only the wide one.

## Images

`lib/media.ts` decides per file: vector art is served straight from `/public`
(the optimizer cannot improve an SVG), photographs go through Next/Image with
AVIF/WebP and correct `sizes`. Once real photos land, they are optimized
automatically — nothing to configure.

To regenerate the placeholder art after editing the generator:

```bash
node scripts/gen-assets.mjs
```

## Design system

Tokens live in the `@theme` block of `app/globals.css`: palette, the fluid
`clamp()` type scale (`text-display` / `text-headline` / `text-title` /
`text-lead` / `text-eyebrow`), section rhythm, and the shared easing curve. Use
those rather than one-off values so the pages stay in one voice.

## Motion

One shared primitive, `components/ui/Reveal.tsx` — a 20px translate and fade,
once, on scroll into view. The hero emblem adds a slow CSS float, a few pixels
of cursor parallax on fine-pointer devices, and a small lift on scroll. Every
piece of it collapses to static under `prefers-reduced-motion`.

## Accessibility

Semantic landmarks, a skip link, a visible focus ring on every interactive
element, `aria-current` on the active nav item, and body text held at or above
the 4.5:1 contrast ratio on the cream background.
