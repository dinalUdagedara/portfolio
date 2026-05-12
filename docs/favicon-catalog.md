# Favicon catalog (this project)

There is no universal “favicon store” inside Next.js. You have three practical paths:

1. **Presets in this repo** (no design tools) — switch with an env var.
2. **External generators** (text, emoji, image → `.ico` / PNG).
3. **Your own file** — drop `app/icon.svg` or `public/favicon.ico` and remove `app/icon.tsx` if you go fully static.

---

## 1. Built-in presets (recommended first try)

Set in `.env.local` or Vercel:

```bash
NEXT_PUBLIC_FAVICON_PRESET=du
```

| Preset value | Preview idea | Good for |
|--------------|--------------|----------|
| **`du`** (default) | **DU** monogram, tight letterspacing | Personal brand, initials |
| **`d`** | Single **D** | Minimal |
| **`code`** | **`</>`** in monospace | Engineer / OSS vibe |
| **`stack`** | Three **horizontal bars** (abstract “layers”) | Clean geometric mark |

After changing the variable, restart `npm run dev` and hard-refresh the tab (favicons cache aggressively).

---

## 2. External “catalogs” and generators

These are independent sites (pick assets there, then add files to the repo if you want to replace our generated icons):

- **[favicon.io](https://favicon.io/)** — text, emoji, or image → download a pack.
- **[RealFaviconGenerator](https://realfavicongenerator.net/)** — upload a master image; get Apple / Android / Windows variants.
- **[Simple Icons](https://simpleicons.org/)** — brand SVGs (license: CC0); only use for **your** brand or marks you have rights to.

---

## 3. Fully custom file in the app

- Add **`app/icon.svg`** (or **`app/icon.png`**) with your artwork.
- Remove **`app/icon.tsx`** (and optionally **`app/apple-icon.tsx`**) if you replace both with static assets from a generator pack.

See Next.js docs: [App icons](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons).
