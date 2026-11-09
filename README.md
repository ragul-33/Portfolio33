# Ragul — Creative Portfolio

A single-page, dark-editorial portfolio for **Ragul — a creative designer and
analytical thinker** positioned across digital design, data work and business
analysis. Built with React 19 + Vite 8 + Tailwind CSS v4, with GSAP/ScrollTrigger
driving the scroll-linked motion and a CSS-3D + canvas signature finale.

The site opens with the hero, then about, capabilities, tools, process, services,
**identity in motion** (an experimental portrait installation that replaces the
ported Spline "X Mask" band), collaboration, contact, and closes with
**Digital Afterglow** — a full-viewport, interactive signature scene built around
the `Ragul.` wordmark. A compact footer follows.

There is **no backend**. The contact form opens a pre-filled Gmail compose window
in a new tab, with a `mailto:` mail-app fallback and a copy-message option —
everything runs in the browser.

---

## Requirements

- **Node.js 20.19+ or 22.12+** — required by Vite 8.
- npm (a `package-lock.json` is included).

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (prints a local URL, default :5173)
```

## Build & preview

```bash
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally to check the real output
```

## Lint

```bash
npm run lint     # oxlint
```

---

## Project structure

```
index.html                  HTML shell, meta tags, font <link>, hero preload
vite.config.js              Vite + React + Tailwind plugins
.oxlintrc.json              lint rules
public/                     static assets served from the site root
  favicon.svg
  hero-character.png/.webp  hero artwork (also the Open Graph image)
  hero-portrait.png/.webp   portrait used by the hero
  img/ragul-vector-smile.*  secondary portrait study
  spline/x-mask-character.png/.webp   ORIGINALS from the Spline export (kept untouched)
  spline/x-mask-character-cut.webp    DERIVED alpha cut-out, made from the original
src/
  main.jsx                  React entry point
  App.jsx                   section order and composition
  index.css                 design tokens, base layer, motion + scene CSS
  site.config.js            contact details, identity, section numbering, nav links
  data/content.js           capabilities / tools / process / services copy
  lib/motion.js             gsap + ScrollTrigger, reveal helpers, reduced-motion helpers
  lib/scroll.js             anchor scrolling with fixed-header offset
  hooks/                    useReducedMotion, useActiveSection
  components/               one file per section + shared UI (see App.jsx)
```

---

## Editing your details

Almost everything personal lives in **`src/site.config.js`**:

- `CONTACT.EMAIL` — the one address used by the contact section, Gmail compose and its `mailto:` fallback.
- `CONTACT.INSTAGRAM_URL` / `CONTACT.LINKEDIN_URL` — real profile URLs. Leave a
  channel as `''` until it exists; the UI renders a quiet placeholder instead of a
  dead link. **No social URLs are invented.**
- `IDENTITY` — name, wordmark, roles, location, timezone, availability and the
  personal `SIGNATURE_EMOJI` used in the contact and footer sign-offs.
- `SECTION_INDEX` — the single source of section numbering (shown by each section
  head and by the mobile menu, so the two can never drift apart).
- `NAV_LINKS` / `FOOTER_LINKS` — navigation targets.

Section copy lives in `src/data/content.js`.

---

## Positioning & accuracy

The profile connects three practices rather than presenting three unrelated
identities:

- **Data** — spreadsheet reporting, structured information and data presentation.
- **Business** — requirements, process and workflow thinking, documentation.
- **Creative** — visual design, interfaces, brand and information design.

Capability status is explicit: **Demonstrated**, **Working knowledge**,
**Developing**, or **Exploring**. The data and business lanes are framed as
practical capability being built, not as prior professional experience. No SQL,
Power BI, Tableau, Python, Jira, certification, client name or outcome is claimed.
Tools such as Excel and Google Workspace are listed only at working-knowledge
level. Keep this distinction intact when editing copy.

Services are grouped into **Data & Reporting**, **Business Analysis & Process
Support**, and **Creative & Digital**, with a scope note where the work is still
developing.

---

## Imagery — please read

**Every image in this project is an illustration. There is no photography here,
and the site says so.** The hero portrait has explicit alt text describing it as a
drawing, and the identity installation is a constructed digital figure rather than
a camera image.

`public/spline/x-mask-character-cut.webp` is a **derived** asset: a chroma-key
cut-out of the original Spline character art, which shipped on a flat blue plate
(`rgb(48, 93, 192)`) that made the band read like a poster. The untouched
originals (`x-mask-character.png` / `.webp`) are kept beside it. Nothing else was
altered.

Raster art is served as WebP with a PNG `<source>`/fallback where applicable.
**Digital Afterglow uses no image assets** — its orb, ring, cube, prism, nodes,
bars, spark, plus and trace are CSS/SVG forms over a 2D canvas.

---

## Motion & accessibility

- Motion is **GSAP + ScrollTrigger**; the finale adds **CSS 3D transforms and one
  2D canvas**. No WebGL, no new animation library and no new runtime dependency.
- Editorial sections use staggered reveals and reversible scroll-linked accents.
  Nothing is pinned, scroll is never hijacked, and effects do not replay
  endlessly.
- **Digital Afterglow** layers an entrance timeline, per-object idle drift, a
  gentle scroll travel, multi-depth pointer/touch parallax, object hover/press
  responses, a magnetic wordmark and a dot-triggered ripple. The canvas is
  decorative (`pointer-events: none`) and never blocks scrolling, selection or
  links.
- `prefers-reduced-motion: reduce` is respected: reveal masks open fully, scans
  and sweeps are hidden, the finale is placed in its final composition, the
  canvas is static, and **all content stays visible**.
- Every GSAP context and observer is reverted on unmount.
- Semantic landmarks, a skip link, keyboard-operable navigation and controls,
  focus-visible states, and `aria-label`/alt text throughout.
- The finale reduces its object set and repositions forms on small screens; the
  wordmark scales from 320px phones to ultra-wide. Narrow layouts reflow rather
  than shrink, and the page has no horizontal overflow.

---

## External dependencies

The project is self-contained **except for web fonts**. `index.html` loads one
stylesheet from Google Fonts:

```
https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700
  &family=JetBrains+Mono:wght@400;500;600
  &family=Space+Grotesk:wght@500;600;700
  &family=Syne:wght@600;700;800&display=swap
```

To work fully offline (or avoid a third-party request), self-host those families
and replace the `<link>` tags in `index.html`. Font stacks fall back gracefully if
the request fails.

Runtime npm dependencies: `react`, `react-dom`, `gsap`, `lucide-react`.
Build-time: `vite`, `@vitejs/plugin-react`, `tailwindcss`, `@tailwindcss/vite`, `oxlint`.

---

## Deploying

The build is a static bundle:

1. `npm run build`
2. Upload the contents of `dist/` to any static host (Netlify, Vercel, GitHub
   Pages, Cloudflare Pages, S3, …).

`vite.config.js` has no `base` set, so assets resolve from `/`. If you deploy
**into a sub-directory** (e.g. `example.com/portfolio/`), add
`base: '/portfolio/'` to the Vite config and rebuild.
