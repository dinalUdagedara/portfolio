export type MediumPost = {
  title: string
  link: string
  pubDate: string
  categories: string[]
  readingTimeMinutes: number
  thumbnail: string | null
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
  // Medium doesn't use <media:thumbnail>. The cover image is placed as the
  // last <figure> in <content:encoded>, just before the tracking pixel.
  const content = between(item, "<content:encoded>", "</content:encoded>") ?? ""
  const figures = allBetween(content, "<figure>", "</figure>")
  for (let i = figures.length - 1; i >= 0; i--) {
    const m = figures[i].match(/src="(https:\/\/cdn-images[^"]+)"/)
    if (m?.[1]) return m[1]
  }
  return null
}

function estimateReadingTime(html: string): number {
  const words = html.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export async function fetchMediumPosts(username: string, limit = 4): Promise<MediumPost[]> {
  const handle = username.replace(/^@/, "").trim()
  if (!handle) return []

  try {
    const res = await fetch(`https://medium.com/feed/@${encodeURIComponent(handle)}`, {
      headers: { "User-Agent": "dinal-udagedara-portfolio" },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []

    const xml = await res.text()
    return allBetween(xml, "<item>", "</item>")
      .slice(0, limit)
      .map((item) => {
        const title = stripCdata(between(item, "<title>", "</title>") ?? "Untitled")
        // Medium puts the canonical URL in <link> or as <guid isPermaLink="true">
        const link =
          between(item, "<link>", "</link>") ??
          between(item, '<guid isPermaLink="true">', "</guid>") ??
          between(item, "<guid>", "</guid>") ??
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
  }
}
