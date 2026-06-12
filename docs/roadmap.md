# Future Roadmap — bpm-astro

> Session: June 12, 2026
> All "quick wins" have been implemented. This doc covers everything remaining.

---

## Completed (Quick Wins)

- [x] Header: replaced miniGL canvas with CSS gradient (blue-to-green, no animation)
- [x] Home hero: rewritten with Full-Stack Web Developer title + bio (Laravel/Vue, React, .NET)
- [x] About page: rewritten as career narrative
- [x] Dark mode: CSS custom properties, toggle button (sun/moon icons), localStorage + prefers-color-scheme
- [x] Dark mode flash fix: blocking head script sets `data-theme` before paint
- [x] View Transitions: `ClientRouter` enabled + `transition:persist` on `<html>`
- [x] Projects page: flat link list converted to styled cards with descriptions
- [x] Resume page: created with iframe embedding resume.brandonmartin.dev
- [x] Planning doc: `docs/quick-wins-plan.md` contains implementation details

---

## Tier 1: Polish (low effort, high impact)

### Tech tags on project cards
- Add badges/bubbles on each project card showing the tech stack (Laravel, Vue, React, .NET, Canvas, PartyKit, etc.)
- Helps recruiters immediately identify relevant experience
- **Files**: `src/pages/projects/index.astro`

### Project screenshots
- Add thumbnail images to each project card
- Even simple screenshots make a huge impression over text-only cards
- Store in `public/images/projects/` or similar
- **Files**: `src/pages/projects/index.astro`

### Dark mode polish
- Verify footer `border-top: 1px solid #ccc` transitions properly in dark mode
- Some card borders and elements may still reference hardcoded `#ccc` — audit for `var(--color)` usage
- **Files**: `src/components/Footer.astro`, `src/pages/projects/index.astro`

### Mobile nav
- Header nav uses `column-count: 3` which is unconventional
- Consider standard hamburger menu or horizontal scroll for small screens
- **Files**: `src/components/Header.astro`

---

## Tier 2: Content for job search (medium effort)

### Add/update portfolio projects
- Current projects are mostly vanilla JS games and tools
- Ideally feature 2-3 full-stack apps showcasing **Laravel + Vue** and/or **.NET + React**
- Real work samples are the biggest resume booster
- Prune or complete hidden stub projects (`to-do-list`, `ro-sham-bo`, `runner`, etc.)

### Meta keywords / SEO
- Helmet description and keywords are generic ("web developer located just northwest of Milwaukee")
- Add Laravel, Vue, React, .NET to improve discoverability for recruiter searches
- **Files**: `src/components/Helmet.astro`

### Resume PDF
- Replace iframe with actual PDF at `/resume.pdf` when the PDF is updated
- **Files**: `public/resume.pdf` (new), `src/pages/resume.astro`

---

## Tier 3: Visual redesign (biggest lift)

### Color palette refresh
- Current green accent (`#2e7d32` light / `#4caf50` dark) works but feels dated
- Consider a more modern palette: indigo/teal/slate, or a muted blue-green
- **Files**: `src/styles/global.scss`

### Typography
- Roboto Slab is great for headings
- Add a cleaner sans-serif for body text (Inter, IBM Plex Sans, or system font stack)
- Keeps the personality while improving readability
- **Files**: `src/styles/_config.scss`

### Layout
- Wider max-widths on content pages
- Better vertical rhythm and whitespace
- Hero section with visual interest (avatar, background graphic, etc.)
- **Files**: `src/styles/global.scss`, `src/pages/index.astro`

### Case study format
- Each featured project gets a dedicated page with problem/solution/tech/outcome narrative
- Move beyond simple tool/game descriptions to show process and impact
- **Files**: `src/pages/projects/*/index.astro`

---

## Recommended Order

1. **Tier 1** — Tech tags + screenshots (can be done in one afternoon)
2. **Tier 2** — Decide which new projects to feature; update resume PDF + meta keywords
3. **Tier 3** — Full visual redesign once new projects are ready and the portfolio narrative is set
