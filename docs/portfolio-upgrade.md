# Portfolio visual upgrade — task list

This document tracks a **quiet luxury** polish pass: warm accent, editorial typography, consistent layout, subtle motion, and share metadata. Execute tasks **in order**; each task is its own git commit.

**Prerequisite:** `npm run dev` after each task to visually verify light and dark mode (press `d`).

---

## Task 1 — Theme tokens (warm accent, calmer neutrals)

**Goal:** Nudge `--primary`, `--ring`, and `--accent` toward a restrained warm copper / amber so buttons, focus rings, and highlights feel cohesive with the hero portrait.

**Done when:** `app/globals.css` reflects the new token values; no component API changes required.

- [x] Complete

---

## Task 2 — Shared section shell (`max-w-6xl`)

**Goal:** Introduce reusable `PortfolioSection` + `SectionTitle` so every block uses the same horizontal measure as the hero and shared title rhythm (mono kicker, strong heading, muted description).

**Done when:** `components/portfolio/section.tsx` exists and Projects, Experience, Contact import it; inner content uses `max-w-6xl`.

- [ ] Complete

---

## Task 3 — Alternating section surfaces

**Goal:** Alternate `band` variants (`default` / `muted`) so long scrolls read as chapters instead of one flat sheet.

**Done when:** Work / Experience / Contact each set an explicit `band` prop for a deliberate pattern.

- [ ] Complete

---

## Task 4 — Hero hook + copy hierarchy

**Goal:** Add a one-line **hook** in `lib/site.ts` (outcome-focused, scannable) above the longer tagline; tune hero typography (tighter name tracking, clearer role label).

**Done when:** `site.hook` exists and `hero.tsx` renders hook → name → tagline → CTAs.

- [ ] Complete

---

## Task 5 — Project cards (editorial + hover)

**Goal:** Split layout with a **gradient tile** + initials, stronger hover (lift + shadow), motion-safe transitions, clearer hierarchy for title vs body.

**Done when:** `projects.tsx` implements the new card layout without changing `Project` type shape.

- [ ] Complete

---

## Task 6 — Experience timeline

**Goal:** Left rail timeline with markers, `font-mono` period line, spacing tuned for readability.

**Done when:** `experience.tsx` uses timeline styling and mono dates.

- [ ] Complete

---

## Task 7 — Header & footer polish

**Goal:** Nav links get an **underline draw** on hover; brand link subtle accent; footer adds a thin accent rule and refined stack line.

**Done when:** `site-header.tsx` and `site-footer.tsx` updated.

- [ ] Complete

---

## Task 8 — Motion (`prefers-reduced-motion`)

**Goal:** Add a `fade-up` keyframe in CSS gated behind `prefers-reduced-motion: no-preference`; stagger list entries slightly.

**Done when:** `globals.css` defines the animation; section lists apply staggered `animation-delay` via inline style from index.

- [ ] Complete

---

## Task 9 — Film grain overlay

**Goal:** Ultra-subtle fixed **noise** layer (pointer-events none, low opacity, `mix-blend-overlay`) for texture in dark mode especially.

**Done when:** A small client-safe component or layout wrapper mounts the overlay above page content.

- [ ] Complete

---

## Task 10 — Open Graph & Twitter cards

**Goal:** Set `metadataBase` from `NEXT_PUBLIC_SITE_URL` (fallback `http://localhost:3000`), plus `openGraph` and `twitter` metadata using name, tagline, and portrait image.

**Done when:** `app/layout.tsx` exports full social metadata; `.env.example` documents `NEXT_PUBLIC_SITE_URL`.

- [ ] Complete

---

## After deploy

1. In Vercel (or your host), set **`NEXT_PUBLIC_SITE_URL`** to the production origin (no trailing slash), e.g. `https://yourname.vercel.app`.
2. Revalidate social previews with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or Twitter’s card validator once live.
