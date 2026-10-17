# Never Ending Captures

Photography and film portfolio built with React, TypeScript, Vite, Tailwind CSS,
GSAP/ScrollTrigger, Lenis, and Lucide icons.

## Getting started

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

## Production

```sh
npm run typecheck
npm run build
npm run preview
```

The deployable static site is written to `dist/`. Deploy that directory to any
static host. Public images and video are served from `public/`.

## Project layout

```text
public/             Images and video served as-is
src/
  components/       Navigation, footer, and cursor
  config/           Contact details and site configuration
  data/             Portfolio image and service content
  hooks/            Scroll and animation lifecycle
  sections/         Editorial portfolio sections
  App.tsx           Page composition
  main.tsx          React entry point
  styles.css        Design system and responsive layout
  tailwind.css      Tailwind CSS entry point
index.html          Vite HTML shell and metadata
vite.config.ts      Vite, React, and Tailwind plugins
```

Update contact details in `src/config/site.ts`.
