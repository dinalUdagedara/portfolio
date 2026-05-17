import { Building2, Globe, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ContributionGraph, ContributionGraphSkeleton } from "@/components/portfolio/contribution-graph"
import { PortfolioSection, SectionTitle } from "@/components/portfolio/section"
import { fetchContributions, fetchGithubUser, normalizeBlogUrl } from "@/lib/github"
import { site } from "@/lib/site"

const PROFILE_STATS = [
  ["public_repos", "Public repositories", "Repositories"],
  ["followers", "Followers", "Followers"],
  ["following", "Following", "Following"],
] as const

export function GithubProfileSkeleton() {
  return (
    <PortfolioSection id="github" band="default">
      <SectionTitle kicker="GitHub" title="Profile" description="Loading from the GitHub API…" />
      <div className="mt-10 overflow-hidden rounded-2xl border border-border/60 bg-card/50">
        <div className="border-b border-border/60 bg-muted/20 p-6 sm:p-8">
          <div className="flex animate-pulse flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div className="mx-auto size-24 shrink-0 rounded-full bg-muted sm:mx-0 sm:size-28" />
            <div className="min-w-0 flex-1 space-y-4">
              <div className="flex justify-between gap-4">
                <div className="space-y-2">
                  <div className="h-6 w-40 rounded bg-muted" />
                  <div className="h-4 w-28 rounded bg-muted" />
                </div>
                <div className="hidden h-9 w-36 rounded-md bg-muted sm:block" />
              </div>
              <div className="h-4 w-full max-w-md rounded bg-muted" />
              <div className="grid grid-cols-3 gap-2">
                <div className="h-14 rounded-xl bg-muted/80" />
                <div className="h-14 rounded-xl bg-muted/80" />
                <div className="h-14 rounded-xl bg-muted/80" />
              </div>
            </div>
          </div>
        </div>
        <ContributionGraphSkeleton embedded />
      </div>
    </PortfolioSection>
  )
}

export async function GithubProfile() {
  const username = site.githubUsername.trim()
  if (!username) {
    return null
  }

  const [user, calendar] = await Promise.all([
    fetchGithubUser(username),
    fetchContributions(username),
  ])

  if (!calendar) {
    const debug =
      process.env.GITHUB_DEBUG === "true" ||
      process.env.NODE_ENV === "development"
    if (debug) {
      console.log("[github] GithubProfile:heatmap-hidden", {
        username,
        userLoaded: Boolean(user),
        hasToken: Boolean(process.env.GITHUB_TOKEN),
      })
    }
  }

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
        description="Profile, stats, and contribution activity from GitHub."
      />

      <div className="portfolio-fade-up mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border/60 bg-muted/20 p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
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
                className="size-24 rounded-full border border-border/80 bg-muted object-cover ring-2 ring-background sm:size-28"
                sizes="112px"
              />
              <span className="sr-only">{displayName} on GitHub</span>
            </Link>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="text-center sm:text-left">
                  <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {displayName}
                  </p>
                  <Link
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-0.5 inline-block font-mono text-sm text-primary hover:underline"
                  >
                    @{user.login}
                  </Link>
                </div>
                <Button asChild className="w-full shrink-0 sm:w-auto" size="default">
                  <Link href={user.html_url} target="_blank" rel="noreferrer">
                    Open GitHub profile
                  </Link>
                </Button>
              </div>

              {user.bio ? (
                <p className="mt-4 text-center text-pretty text-sm leading-relaxed text-muted-foreground sm:text-left">
                  {user.bio}
                </p>
              ) : null}

              <dl className="mt-5 grid grid-cols-3 divide-x divide-border/60 overflow-hidden rounded-xl border border-border/60 bg-background/60">
                {PROFILE_STATS.map(([key, label, caption]) => (
                  <div
                    key={key}
                    className="px-3 py-3 text-center sm:px-4 sm:py-3.5 sm:text-left"
                  >
                    <dt className="sr-only">{label}</dt>
                    <dd className="font-mono text-xl font-semibold tabular-nums tracking-tight sm:text-2xl">
                      {user[key]}
                    </dd>
                    <dd className="mt-0.5 text-[11px] text-muted-foreground">{caption}</dd>
                  </div>
                ))}
              </dl>

              {(user.company || user.location || blogUrl) && (
                <ul className="mt-4 flex flex-col items-center gap-2 text-sm text-muted-foreground sm:items-start">
                  {user.company ? (
                    <li className="flex items-center gap-2">
                      <Building2 className="size-3.5 shrink-0 opacity-60" aria-hidden />
                      <span>{user.company}</span>
                    </li>
                  ) : null}
                  {user.location ? (
                    <li className="flex items-center gap-2">
                      <MapPin className="size-3.5 shrink-0 opacity-60" aria-hidden />
                      <span>{user.location}</span>
                    </li>
                  ) : null}
                  {blogUrl ? (
                    <li className="flex items-center gap-2">
                      <Globe className="size-3.5 shrink-0 opacity-60" aria-hidden />
                      <Link
                        href={blogUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline"
                      >
                        {blogUrl.replace(/^https?:\/\//, "")}
                      </Link>
                    </li>
                  ) : null}
                </ul>
              )}
            </div>
          </div>
        </div>

        {calendar ? (
          <ContributionGraph
            calendar={calendar}
            profileUrl={user.html_url}
            embedded
          />
        ) : null}
      </div>
    </PortfolioSection>
  )
}
