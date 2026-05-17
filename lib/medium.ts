export const MEDIUM_POST_LIMIT = 4

export type MediumPost = {
  title: string
  link: string
  pubDate: string
  categories: string[]
  readingTimeMinutes: number
  thumbnail: string | null
}

/** Strips a leading @ and trims whitespace. Safe to call on already-normalized handles. */
export function normalizeMediumHandle(username: string): string {
  return username.replace(/^@/, "").trim()
}

function between(str: string, open: string, close: string): string | null {
  const s = str.indexOf(open)
  if (s === -1) return null
  const e = str.indexOf(close, s + open.length)
  if (e === -1) return null
  return str.slice(s + open.length, e)
}

function allBetween(str: string, open: string, close: string): string[] {
  const out: string[] = []
  let i = 0
  for (;;) {
    const s = str.indexOf(open, i)
    if (s === -1) break
    const e = str.indexOf(close, s + open.length)
    if (e === -1) break
    out.push(str.slice(s + open.length, e))
    i = e + close.length
  }
  return out
}

function stripCdata(s: string): string {
  return s.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim()
}

function extractThumbnail(item: string): string | null {
  // Medium places the cover as the last <figure> in content:encoded (before the tracking pixel).
  // Strip CDATA before searching so the search string is pure HTML.
  const raw = between(item, "<content:encoded>", "</content:encoded>") ?? ""
  const content = stripCdata(raw)
  const figures = allBetween(content, "<figure>", "</figure>")
  for (let i = figures.length - 1; i >= 0; i--) {
    // Only match the allowlisted CDN hostname to avoid next/image errors.
    const m = figures[i].match(/src="(https:\/\/cdn-images-1\.medium\.com[^"]+)"/)
    if (m?.[1]) return m[1]
  }
  return null
}

function estimateReadingTime(html: string): number {
  const words = html.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export async function fetchMediumPosts(
  username: string,
  limit = MEDIUM_POST_LIMIT
): Promise<MediumPost[]> {
  const handle = normalizeMediumHandle(username)
  if (!handle) return []

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 5000)

  try {
    const res = await fetch(`https://medium.com/feed/@${handle}`, {
      signal: controller.signal,
      headers: { "User-Agent": "dinal-udagedara-portfolio" },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []

    const xml = await res.text()
    return allBetween(xml, "<item>", "</item>")
      .slice(0, limit)
      .map((item) => {
        const title = stripCdata(between(item, "<title>", "</title>") ?? "Untitled")
        // Medium emits a proper <link>...</link> with the canonical slug URL.
        // Fall back to <guid> (any attribute variant) if somehow absent.
        const link =
          between(item, "<link>", "</link>") ??
          item.match(/<guid[^>]*>(https:\/\/[^<]+)<\/guid>/)?.[1] ??
          "#"
        const pubDate = between(item, "<pubDate>", "</pubDate>") ?? ""
        const categories = allBetween(item, "<category>", "</category>")
          .map(stripCdata)
          .slice(0, 3)
        const content = stripCdata(
          between(item, "<content:encoded>", "</content:encoded>") ?? ""
        )
        return {
          title,
          link: link.trim(),
          pubDate,
          categories,
          readingTimeMinutes: estimateReadingTime(content),
          thumbnail: extractThumbnail(item),
        }
      })
  } catch {
    return []
  } finally {
    clearTimeout(timer)
  }
}
