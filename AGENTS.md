# AGENTS.md — bpm-astro

Personal site at [brandonmartin.dev](https://brandonmartin.dev), built with Astro 6 + SSR, deployed to Netlify.

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` or `npm start` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run astro` | Astro CLI passthrough |

No test, lint, or typecheck commands exist. Astro's built-in TypeScript checking via `astro check` is available, but not wired.

## Architecture

- **Framework scoping**: React components must live under `src/components/react/` (`include: ['**/react/**']`). SolidJS under `src/components/solid/` (`include: ['**/solid/**']`). Svelte and Vue components have no directory restriction.
- **Output**: `server` mode via `@astrojs/netlify` adapter.
- **Styling**: SCSS via `sass` package using `@use` syntax (`src/styles/_config.scss`). PostCSS with `autoprefixer` + `cssnano` for production.
- **Env**: `PUBLIC_PARTYKIT_HOST` required for PartyKit live polls (Vue components in `src/components/vue/`).
- **Project pages** are under `src/pages/projects/`, each in its own subdirectory with `index.astro`.
- **Layouts**: `PageLayout.astro` (main) and `PageLayoutSimple.astro` — header/footer/socials are shared `.astro` components.
- **Sitemap**: Auto-generated via `@astrojs/sitemap`.

## Multi-framework component reference

| Framework | Directory | Astro integration |
|-----------|-----------|-------------------|
| React 19 | `src/components/react/` | `@astrojs/react` (directory-scoped) |
| SolidJS 1.9 | `src/components/solid/` | `@astrojs/solid-js` (directory-scoped) |
| Svelte 5 | `src/components/svelte/` | `@astrojs/svelte` |
| Vue 3 | `src/components/vue/` | `@astrojs/vue` |
| MUI 9 | React components | `@mui/material` |

## Notable deps

- `partysocket` — WebSocket client for PartyKit live polls
- `markdown-it` — used in Vue MarkdownEditor
- `sass` — SCSS compilation, used across `.astro` and standalone stylesheets
