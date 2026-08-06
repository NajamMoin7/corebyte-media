# DESIGN.md — Core Byte Media

Black-and-gold circuit-tech. Tokens live in `src/app/globals.css`. This file is
the rationale.

## Dials (taste-skill)
`DESIGN_VARIANCE: 8` · `MOTION_INTENSITY: 8` · `VISUAL_DENSITY: 4`
Agency/creative register + full-WebGL build. Asymmetric layouts, cinematic motion,
airy-to-medium density.

## Color (one accent, locked)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#0a0908` | near-black page base, warmed toward the gold |
| `--bg-elevated` | `#121110` | footer, raised sections |
| `--surface` | `#1a1815` | cards, chips, nav pill |
| `--surface-2` | `#24211b` | hover, scrollbar |
| `--fg` | `#f5f2ec` | primary text |
| `--fg-muted` | `#a8a294` | body/secondary |
| `--fg-dim` | `#8a857a` | labels, captions |
| `--accent` | `#e8c26a` | glows, circuit lines, text-accent on dark |
| `--accent-solid` | `#c9a227` | button fills (**black** text, 7.8:1) |
| `--accent-deep` | `#6b5214` | gradient deep stop |

Gold accent is sampled from the mark. The one hard rule the crimson theme did
not have: `--accent-solid` takes `text-bg`, never `text-white` — white on gold
is ~2:1 and fails AA. No pure black/white. No second accent.

## Type
- **Display:** Clash Display (self-hosted, weights 400–700). Headlines, big moments.
- **Sans (UI/body):** Geist.
- **Mono:** JetBrains Mono. Technical labels, eyebrows, code, numbers — fits the
  circuit theme.
- No serif. No Inter as default.
- Emphasis within a headline: italic/bold of the SAME family, never a mixed serif.

## Layout
- Container `max-w-[1400px]`, padding `px-5 sm:px-8`.
- Breakpoints standard (sm 640 … 2xl 1536).
- Hero uses `min-h-dvh`, never `h-screen`.
- Eyebrows rationed: max 1 per 3 sections (use `.eyebrow`).
- At least 4 distinct layout families across a page; no 3+ consecutive zigzags.
- Cards only when elevation means something; prefer borders + space.

## Elevation & shape
- Radius scale: pills for interactive (`rounded-full`), `~14px` for cards/inputs.
- Shadows tinted to the gold glow (`.glow-accent`), never pure-black drop shadows.

## Motion
- **Framer Motion** (`motion/react`) for UI, layout, reveals, state.
- **GSAP + ScrollTrigger** for scroll choreography (sticky-stack, horizontal pan).
- **R3F / three** for WebGL scenes. Isolated in `'use client'` leaf components;
  never share a tree with Framer.
- **Lenis** for smooth scroll (off under reduced-motion).
- All motion above intensity 3 honors `prefers-reduced-motion`.
- Easing: ease-out curves (`[0.16,1,0.3,1]`) / springs. No bounce/elastic.

## Recurring motif
Circuit traces (thin glowing lines), nodes (small dots/rings), the gear. Pulled
from the logo. Appears in WebGL hero, section dividers, and the `.circuit-grid`
backdrop.

## Components (built progressively)
`Navbar`, `Footer`, `Wordmark`, `SmoothScroll` (done). Coming: `MagneticButton`,
`Section`, `Reveal`, WebGL `Scene` wrappers, `ServiceCard`, `WorkCard`,
`Marquee`, `ChatWidget`.
