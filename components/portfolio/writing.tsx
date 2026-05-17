import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { PortfolioSection, SectionTitle } from "@/components/portfolio/section"
import { fetchMediumPosts } from "@/lib/medium"
import { site } from "@/lib/site"

function formatDate(pubDate: string): string {
  if (!pubDate) return ""
  const d = new Date(pubDate)
  if (isNaN(d.getTime())) return ""
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export function WritingSkeleton() {
  return (
    <PortfolioSection id="writing" band="muted">
      <SectionTitle kicker="Medium" title="Writing" description="Loading recent articles…" />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card">
            <div className="aspect-[16/9] w-full bg-muted" />
            <div className="p-5">
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="mt-3 h-4 w-full rounded bg-muted" />
              <div className="mt-2 h-4 w-1/2 rounded bg-muted" />
              <div className="mt-5 flex gap-2">
                <div className="h-5 w-16 rounded-full bg-muted" />
                <div className="h-5 w-12 rounded-full bg-muted" />
              </div>
              <div className="mt-3 h-3 w-24 rounded bg-muted" />
            </div>
          </li>
        ))}
      </ul>
    </PortfolioSection>
  )
}

export async function Writing() {
  const username = site.mediumUsername.trim()
  if (!username) return null

  const handle = username.replace(/^@/, "")
  const profileHref = `https://medium.com/@${handle}`
  const posts = await fetchMediumPosts(username)

  return (
    <PortfolioSection id="writing" band="muted">
      <SectionTitle
        kicker="Medium"
        title="Writing"
        description="Recent articles — refreshes about once an hour."
      />

      {posts.length === 0 ? (
        <div className="mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href={profileHref} target="_blank" rel="noreferrer">
              Read on Medium
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <li
                key={post.link}
                className="portfolio-fade-up"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <Link
                  href={post.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.99] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  {post.thumbnail && (
                    <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-muted">
                      <Image
                        src={post.thumbnail}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                  <h3 className="flex-1 text-sm font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  {post.categories.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.categories.map((cat) => (
                        <span
                          key={cat}
                          className="rounded-full border border-border/80 bg-background/80 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    {post.readingTimeMinutes > 0 && (
                      <span>{post.readingTimeMinutes} min read</span>
                    )}
                    {post.pubDate && <span>{formatDate(post.pubDate)}</span>}
                  </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href={profileHref} target="_blank" rel="noreferrer">
                All articles on Medium
              </Link>
            </Button>
          </div>
        </>
      )}
    </PortfolioSection>
  )
}
