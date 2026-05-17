# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run lint         # ESLint (flat config, ESLint 9+)
npm run format       # Prettier write over all .ts/.tsx files
npm run typecheck    # tsc --noEmit (no test runner configured)
```

## Architecture

Single-page Next.js 16 portfolio using the App Router. All navigation is hash-based (`#work`, `#experience`, `#github`, `#contact`) — there are no additional routes.

**Content lives in `lib/site.ts`** — projects, experience, links, and site metadata are all centralized there. Update that file to change page content without touching components.

**Key directories:**

- `app/` — Root layout, home page, and metadata files (manifest, sitemap, robots, icons)
- `components/portfolio/` — Domain components (hero, projects, experience, contact, header, footer, github-profile)
- `components/ui/` — shadcn/ui primitives (added via `npx shadcn@latest add <component>`)
- `lib/` — `site.ts` (content config), `github.ts` (GitHub REST API fetch), `utils.ts` (`cn()` helper), `favicon-preset.ts`

## Environment Variables

See `.env.example`:

```
NEXT_PUBLIC_SITE_URL        # Used for OG/Twitter absolute URLs
NEXT_PUBLIC_FAVICON_PRESET  # Favicon mark preset: d | du | code | stack
GITHUB_TOKEN                # Optional GitHub PAT to avoid rate limits
```

## Key Patterns

**Data fetching** — `GithubProfile` is an async Server Component with ISR (`revalidate: 3600`). It's wrapped in a `<Suspense>` boundary with a skeleton fallback in `app/page.tsx`.

**Styling** — Tailwind CSS v4 via `@tailwindcss/postcss`. Use `cn()` from `lib/utils.ts` (clsx + tailwind-merge) for conditional classes. Prettier sorts Tailwind classes automatically via the `prettier-plugin-tailwindcss` plugin configured with the `cn` and `cva` functions.

**Animations** — Staggered `portfolio-fade-up` keyframe animation on list items using the CSS custom property `--delay`. Respects `prefers-reduced-motion`.

**Theme** — `next-themes` dark/light toggle. Press `d` anywhere on the page to toggle (implemented in `components/theme-provider.tsx`; skips when focus is in an input/contenteditable).

**Favicon presets** — Controlled by `NEXT_PUBLIC_FAVICON_PRESET`. Preset logic is in `lib/favicon-preset.ts`; the SVG mark renders in `components/favicon/favicon-mark.tsx` and is used by `app/icon.tsx` and `app/apple-icon.tsx`.

**Remote images** — Only `avatars.githubusercontent.com` is allowed in `next.config.mjs`. Add new domains there before using `next/image` with external sources.

**Formatting** — No semicolons, single quotes off, 80-char print width (see `.prettierrc`).
