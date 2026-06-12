# Quick Wins — Implementation Plan

> Session date: June 12, 2026
> These changes were implemented to prepare the site for Brandon's job search.

## Changes Made

### 1. Replace miniGL canvas with CSS gradient header
- **File**: `src/components/Header.astro`
- Removed canvas element, CDN script (`minigl.js`), and inline init
- Replaced with `::before` pseudo-element using `linear-gradient(135deg, #4805ba, #f728f3, #158a15)`
- Added `@keyframes gradient-shift` animation for subtle movement

### 2. Rewrite home hero + remove "GENIUS"
- **Files**: `src/pages/index.astro`, `src/pages/about.astro`
- Title changed from `"Web Developer and GENIUS"` to `"Full-Stack Web Developer"`
- Home page now has a professional bio mentioning Laravel/Vue, React, and .NET
- CTA buttons: "View My Work" and "Get in Touch"
- About page rewritten as career narrative instead of contractor pitch

### 3. Add dark mode
- **Files**: `src/styles/_config.scss`, `src/styles/global.scss`, `src/components/Footer.astro`, `src/layouts/PageLayout.astro`
- `_config.scss`: Converted to CSS custom properties with `:root` / `[data-theme='dark']`
- Dark accent: `#4caf50` (lighter green) for readability on dark bg
- Footer: Wired up hidden theme toggle button with sun/moon SVG icons
- Added `prefers-color-scheme` auto-detection with `localStorage` override
- PageLayout: Changed from hardcoded `data-theme='light'` to default light

### 4. Create resume page
- **File**: `src/pages/resume.astro` (new)
- Embeds `https://resume.brandonmartin.dev` in an iframe
- Fallback link if iframe doesn't load
- Uses `PageLayoutSimple` for clean presentation

### 5. Convert projects to styled cards
- **File**: `src/pages/projects/index.astro`
- Replaced flat `<a>` list with CSS grid of card elements
- Each card: project name, short description, hover lift effect
- Hidden stubs preserved but excluded from render
- Responsive: 1-col mobile, 2-col tablet, 3-col desktop

## To Do Later
- Add actual resume PDF when updated
- Expand project cards with tech tags, screenshots, live/github links
- Full visual redesign with new color palette, typography, and layout
- Add case studies or blog section
- Finish/polish hidden project stubs
