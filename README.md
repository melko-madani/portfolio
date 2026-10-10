# Yassine Madani — portfolio

Personal portfolio of Yassine Madani, AI engineer (intelligent automation, document intelligence, digital solutions).

Editorial, content-first site: a home page with selected work, about, capabilities, experience and contact, plus one prerendered case-study page per project.

## Stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS 4 (design tokens live in `src/index.css`)
- React Router 7 with static prerendering (`scripts/prerender.mjs`) — every route is a real HTML file
- Self-hosted fonts: Instrument Serif, Inter Variable, JetBrains Mono Variable (`@fontsource`)
- Art direction layer: a fan of five patterned story cards in the hero that open a card deck dialog (`src/components/stories/`), paper grain, masked headline reveals, editorial numerals, duotone portrait — all disabled under reduced motion where relevant
- Vitest for content validation tests, oxlint for linting
- No backend, no analytics, no secrets

## Commands

```bash
npm install
```

```bash
npm run dev          # dev server on http://localhost:5173
```

```bash
npm run build        # typecheck + client build + SSR build + prerender → dist/
```

```bash
npm run preview      # serve dist/ locally
```

```bash
npm run typecheck    # tsc -b
npm run lint         # oxlint
npm test             # vitest
npm run og:generate  # regenerate public/og-image.png and apple-touch-icon.png (requires sharp)
```

## Deploying

`dist/` is static. It contains `index.html`, `work/<slug>/index.html` for each project and `404.html`, so any static host works without rewrite rules (Netlify, Vercel, Cloudflare Pages, GitHub Pages).

Before the first deployment, set `siteUrl` in `src/content/en/site.ts` to the final domain and rebuild: canonical and Open Graph URLs derive from it.

## Editing content

All copy and facts live in `src/content/en/` and `src/content/fr/` — the components never hardcode text.

| File | Contains |
|---|---|
| `../site.ts` | Email, LinkedIn, GitHub, CV path, availability toggle, employer-name toggle, site URL (shared by all languages) |
| `profile.ts` | Name, titles, headline lines, intro |
| `stories.ts` | The five hero cards (label, title, paragraphs, pattern) |
| `projects.ts` | The projects and their case-study sections (`slug`, `status`, `role`, `stack`, `visual`, `layout`, `caseStudySections`, …) |
| `experience.ts` | Experience entries, education, capabilities |
| `ui.ts` | Navigation labels, section headings, about text, microcopy |
| `types.ts` | The content model shared by every locale |

Open questions and provisional values are listed in [`CONTENT_TO_CONFIRM.md`](CONTENT_TO_CONFIRM.md).

### Project visuals

The four project visuals are hand-built HTML/SVG recreations in `src/components/visuals/`, drawn in the site's own design language with fictitious data. Replace any of them with a real screenshot by editing `ProjectVisual.tsx`.

### Languages

The site is bilingual. English lives at the root (`/`, `/work/<slug>`) and French under `/fr` (`/fr`, `/fr/work/<slug>`). Both are prerendered, each page carries `<html lang>`, `hreflang` alternates and a localised title and description, and the header and footer carry a working language switch that keeps you on the same page.

Content per language lives in `src/content/en/` and `src/content/fr/`; `src/content/site.ts` holds the shared configuration. To add a third language, create `src/content/<code>/` with the same files, register it in `src/content/index.ts` (`locales`, `contents`) and add its two routes in `App.tsx`. The parity test in `content.test.ts` checks that every locale has the same projects and sections.

## Structure

```
src/
  content/           content model and English content
  components/
    layout/          Header (desktop nav + accessible mobile menu), Footer, Layout
    sections/        Hero, Work, About, Capabilities, Experience (+ Education), Contact
    stories/         StoryFan (hero cards), StoryDialog (native <dialog> deck), StoryPattern (SVG faces)
    visuals/         one component per project visual
    Reveal.tsx       scroll-triggered reveal (IntersectionObserver, reduced-motion aware)
    ui.tsx           SectionHeading, Cta, Tag, MetaRow, icons
  hooks/             document meta, hash scrolling, active-section tracking
  lib/seo.ts         route metadata, Open Graph tags, static route list
  pages/             Home, CaseStudy, NotFound
  entry-client.tsx   hydrates the prerendered markup (or renders if the route differs)
  entry-server.tsx   renderToString entry used by the prerender script
scripts/
  prerender.mjs      writes one HTML file per route with page-specific metadata
  og.mjs             generates the Open Graph image
public/
  images/            portrait (replace with a larger file if available)
  favicon.svg, og-image.png, apple-touch-icon.png
```

## Accessibility and motion

Semantic landmarks and headings, skip link, visible focus styles, keyboard-operable mobile menu (Escape closes, focus moves into the dialog), `alt` text and SVG titles on visuals, and every animation disabled under `prefers-reduced-motion`.
