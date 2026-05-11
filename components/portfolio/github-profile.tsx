import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { PortfolioSection, SectionTitle } from "@/components/portfolio/section"
import { fetchGithubUser, normalizeBlogUrl } from "@/lib/github"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function GithubProfileSkeleton() {
  return (
    <PortfolioSection id="github" band="default">
      <SectionTitle kicker="GitHub" title="Profile" description="Loading from the GitHub API…" />
      <div className="mt-10 flex animate-pulse flex-col gap-6 rounded-2xl border border-border/60 bg-card/50 p-6 sm:flex-row sm:items-start">
        <div className="mx-auto size-28 shrink-0 rounded-full bg-muted sm:mx-0" />
        <div className="min-w-0 flex-1 space-y-3">
          <div className="h-4 w-full max-w-md rounded bg-muted" />
          <div className="h-4 w-full max-w-lg rounded bg-muted" />
          <div className="h-4 w-2/3 max-w-sm rounded bg-muted" />
        </div>
      </div>
    </PortfolioSection>
  )
}

export async function GithubProfile() {
  const username = site.githubUsername.trim()
  if (!username) {
    return null
  }

  const user = await fetchGithubUser(username)
  const profileHref = `https://github.com/${username}`

  if (!user) {
    return (
      <PortfolioSection id="github" band="default">
        <SectionTitle
          kicker="GitHub"
          title="Profile"
          description="Could not load data from the GitHub API (rate limit or username). Open your profile directly instead."
        />
        <div className="mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href={profileHref} target="_blank" rel="noreferrer">
              View @{username} on GitHub
            </Link>
          </Button>
        </div>
      </PortfolioSection>
    )
  }

  const displayName = user.name?.trim() || user.login
  const blogUrl = normalizeBlogUrl(user.blog)

  return (
    <PortfolioSection id="github" band="default">
      <SectionTitle
        kicker="GitHub"
        title="Profile"
        description="Pulled from the public GitHub API; refreshes about once an hour."
      />

      <div
        className={cn(
          "portfolio-fade-up mt-10 flex flex-col gap-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:items-start sm:gap-10 sm:p-8"
        )}
      >
        <Link
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          className="relative mx-auto shrink-0 outline-none ring-offset-background transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-ring sm:mx-0"
        >
          <Image
            src={user.avatar_url}
            alt={`${displayName} avatar`}
            width={112}
            height={112}
            className="size-28 rounded-full border border-border/80 bg-muted object-cover ring-2 ring-background sm:size-32"
            sizes="112px"
          />
          <span className="sr-only">{displayName} on GitHub</span>
        </Link>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <p className="text-xl font-semibold tracking-tight">{displayName}</p>
            <Link
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-primary hover:underline"
            >
              @{user.login}
            </Link>
          </div>

          {user.bio ? (
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">{user.bio}</p>
          ) : null}

          <dl className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 text-center sm:justify-start sm:text-left">
            <div>
              <dt className="sr-only">Public repositories</dt>
              <dd className="font-mono text-2xl font-semibold tabular-nums text-foreground">{user.public_repos}</dd>
              <dd className="text-xs text-muted-foreground">Repositories</dd>
            </div>
            <div>
              <dt className="sr-only">Followers</dt>
              <dd className="font-mono text-2xl font-semibold tabular-nums text-foreground">{user.followers}</dd>
              <dd className="text-xs text-muted-foreground">Followers</dd>
            </div>
            <div>
              <dt className="sr-only">Following</dt>
              <dd className="font-mono text-2xl font-semibold tabular-nums text-foreground">{user.following}</dd>
              <dd className="text-xs text-muted-foreground">Following</dd>
            </div>
          </dl>

          {(user.company || user.location || blogUrl) && (
            <ul className="mt-5 space-y-1 text-sm text-muted-foreground">
              {user.company ? <li>{user.company}</li> : null}
              {user.location ? <li>{user.location}</li> : null}
              {blogUrl ? (
                <li>
                  <Link href={blogUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                    {blogUrl.replace(/^https?:\/\//, "")}
                  </Link>
                </li>
              ) : null}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
            <Button asChild size="lg">
              <Link href={user.html_url} target="_blank" rel="noreferrer">
                Open GitHub profile
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PortfolioSection>
  )
}
