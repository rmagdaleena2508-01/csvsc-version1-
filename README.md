# CSI Student Chapter — SRMIST Vadapalani

Website for the Computer Society of India Student Chapter at SRMIST Vadapalani.

Live at https://csi-srmistvdp.vercel.app/

## What this is for

Our chapter runs sessions fairly regularly, and until now the only record of
them was a poster in a WhatsApp group. Those scroll away in about a week. Six
months later nobody can tell you who spoke or what was covered.

So I built somewhere for them to live. Each session keeps its poster, speaker,
venue and topics on its own page. If a junior wants to see what the chapter has
been doing, or a speaker wants to link to their talk, or next year's office
bearers want to know what happened before them, it's there.

I also wanted it to look like someone actually cared. Students judge a chapter
by whatever page they land on first, and a stock template says nobody did.

## Versions

**v1 is what's live now.** Hero, current session, photographs from the sessions,
the full event archive with a page per session, the team, a few takeaways, and
the social links. It's static, it loads fast, and everything on it is real
content rather than placeholder text.

**v2 is what I'm working towards.** I'm still learning both design and
development, and building v1 showed me where I'm weak in each. Things I want to
fix next:

- Typography and spacing. There are decisions in here I'd make differently now.
- A written-down design system, so whoever takes this over has rules instead of
  guesses.
- Speaker names and proper write-ups for the older sessions.
- A real domain instead of the deployment subdomain.
- Search across sessions, once there are enough of them to need it.

If you're in the chapter and want something in v2, open an issue.

## Design decisions

I went for an editorial layout — large headings, a lot of whitespace, few
things per screen. Club websites usually go the other way and cram six widgets
above the fold. Keeping it sparse was easier to build and looks better.

Each section does one job. The hero says who we are, the next section shows
what's happening now, then the photographs, then the team, then the takeaways.
Someone who leaves after two screens still knows what the chapter is.

The photographs do most of the work. A packed lab with a speaker in front of a
slide says more about an active chapter than any description would, so real
photos get more space than anything else on the page. Event posters are shown
whole and uncropped, since the poster is what people actually saw.

There are four typefaces, each doing something specific: Instrument Sans for
the interface, Playfair Display for section headings, Inter for a couple of
words in the hero, Great Vibes for the two script words. Colour is almost
entirely navy on cream, so the hierarchy comes from size and spacing.

Animation is kept small. Sections fade and rise 20px as they come into view,
the cards have a metallic edge that shifts while you scroll, and in-page jumps
use a fixed 520ms scroll. That last one exists because Chrome's own smooth
scroll gets slower the further it travels, and jumping to the bottom of the page
felt broken. Everything is disabled under `prefers-reduced-motion`.

## Tech stack

**Next.js 16 with the App Router.** Every page is prerendered to static HTML at
build time. No server to run, no database, and it can be hosted for free. The
event pages come from `generateStaticParams` over a data file, so adding a
session adds a page.

**React 19 and TypeScript.** The types double as documentation for whoever
maintains this next. `ChapterEvent` lists exactly what an event needs, and the
build breaks if something's missing.

**Tailwind CSS 4.** All the design tokens sit in one `@theme` block — colours,
the fluid type scale, spacing, easing. Changing the look means editing that
block. Deleting a component also deletes its styles, which matters when you're
still figuring out the layout.

**Motion** for scroll reveals and the college dialog. Everything else is plain
CSS, since pulling in an animation library for a fade isn't worth the bytes.

**next/font** self-hosts and inlines the four typefaces at build time, so
there's no request to Google and no shift when they load.

**No CMS.** A CMS means an account and a subscription to hand over every year.
Content lives in typed files in the repo instead, so changes go through pull
requests and the git history shows who changed what.

## Editing the content

None of the copy is written inside components. To change the site, edit:

- `data/site.ts` — chapter name, URL, social links, navigation
- `data/events.ts` — every session, and which one is featured
- `data/team.ts` — office bearers, faculty first
- `data/insights.ts` — the takeaways section

Adding an event to `data/events.ts` gives you the card, the page at
`/events/[slug]`, the metadata and the sitemap entry. Nothing else to touch.

A team member without a `name` shows up as "Announcing soon", so the grid stays
even while a role is unfilled. Categories in `upcomingCategories` show a
coming-soon notice instead of an empty page.

## Running it

```bash
npm install
npm run dev     # localhost:8790
npm run build
npm run lint
```

## Deploying

The same config builds for two places, switched by environment variables.

Vercel is the live site and deploys on every push to `main`. GitHub Pages runs
as a backup from `.github/workflows/deploy-pages.yml`, built with `noindex` so
Google doesn't treat the two as duplicates of each other.

| Variable | Vercel | Pages |
| --- | --- | --- |
| `STATIC_EXPORT` | unset | `true` |
| `NEXT_PUBLIC_BASE_PATH` | unset | `/CSI-SRMISTVDP` |
| `NEXT_PUBLIC_SITE_URL` | production domain | the Pages URL |
| `NEXT_PUBLIC_NOINDEX` | unset | `true` |

If you hand-write anything pointing at `/public` — a raw `<img>`, a CSS `url()`
— run it through `asset()` in `lib/asset.ts`, or it'll 404 on Pages where the
site sits under a subpath. `next/image` and `next/link` handle that themselves.

## Images

`lib/media.ts` decides per file. SVGs are served straight from `/public`, since
the optimizer can't improve a vector, and photographs go through `next/image`
for AVIF and WebP. The `Img` wrapper in `components/ui/Img.tsx` applies that
rule plus the base path, because `next/image` only rewrites paths for images it
optimizes — an unoptimized one 404s on Pages otherwise. That took me a while to
work out.

Three scripts prepare the artwork:

```bash
python3 scripts/prepare-brand.py             # cuts white out of the two seals, resizes the skies
python3 scripts/knockout-credit.py <image>   # lifts the handwritten credit off its background
python3 scripts/make-og.py                   # builds the link preview card
```

They need Pillow and numpy. Originals are in `scripts/source/`.

## Accessibility

Semantic landmarks, a skip link, visible focus rings, `aria-current` on the
active nav item, focus handling in the dialog, and body text at or above 4.5:1
contrast against the cream background. Every animation is skipped under
`prefers-reduced-motion`.

## Artwork

- The hero sky was generated with ChatGPT 5.6 Sol, then cropped two ways: tall
  for phones, wide for laptops, so a phone doesn't download the desktop frame.
- Session photographs were taken at the sessions.
- Event posters are the chapter's own.
- The credit in the footer is handwritten, then cleaned up by
  `scripts/knockout-credit.py`.

---

Designed and developed by R. Magdaleena, Vice President, CSI Student Chapter,
SRMIST Vadapalani.
