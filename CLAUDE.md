# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OnAir Studio — a tattoo and piercing studio website for Las Palmas de Gran Canaria. Static single-page site with no build tools, no framework, no bundler.

## Stack

- **Pure HTML/CSS/JS** — no dependencies (package-lock.json is empty)
- Fonts: Google Fonts (Bebas Neue, DM Serif Display, DM Mono)
- Images: Pexels CDN URLs (no local assets)

## Files

- `index.html` — Main website (nav, hero, gallery, artists, booking form, footer)
- `styles.css` — All styles including responsive breakpoints (768px, 480px, 1024px)
- `script.js` — Custom cursor, gallery rendering/filtering, artist cards, calendar/booking logic, scroll reveal, mobile nav
- `presentacion.html` — Self-contained client presentation deck (inline styles/JS)

## Development

Open `index.html` directly in a browser or use any static server:
```bash
npx serve .
# or
python3 -m http.server 8000
```

No build step, no linting, no tests.

## Architecture

- **Gallery**: Items defined as a JS array (`galleryItems` in script.js), rendered dynamically into a masonry CSS columns layout. Filter buttons toggle by style category.
- **Artists**: Data array (`artists` in script.js) rendered as cards with portrait, bio, tags, and recent work thumbnails.
- **Booking**: Interactive calendar with hardcoded booked days/times. Form collects client data but only shows a notification — no backend submission.
- **Scroll reveal**: `IntersectionObserver` on `.reveal` elements triggers `.visible` class.
- **Custom cursor**: Red dot + ring, hidden on mobile via `@media (hover: none)`.
- **Mobile nav**: Full-screen overlay toggled by hamburger button.

## Design System (CSS Variables)

```
--ink (#0a0a08), --coal (#111110), --graphite (#1c1c1a), --ash (#2e2e2b)
--mist (#888880), --paper (#e8e4dc), --cream (#f4f0e6)
--red (#c0392b), --gold (#b8943f)
```

Font families: `--ff-display` (Bebas Neue), `--ff-serif` (DM Serif Display), `--ff-mono` (DM Mono).

## Key Conventions

- All UI text is in **Spanish**
- `cursor: none` on all interactive elements (custom cursor replaces default) — disabled on touch devices
- No local images — all imagery via Pexels URL params (`?w=...&h=...&fit=crop`)
- Safe area support for iPhone notch/home bar via `env(safe-area-inset-*)`
