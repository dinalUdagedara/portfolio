import Link from "next/link"

import { ContributionGraphGrid } from "@/components/portfolio/contribution-graph-grid"
import type { ContributionCalendar } from "@/lib/github"
import { type GridDay, normalizeContributionWeeks } from "@/lib/contribution-grid"
import { cn } from "@/lib/utils"

const CELL = "h-[11px] w-[11px] rounded-[3px] sm:h-3 sm:w-3"

function contributionLevels(weeks: GridDay[][]): number[] {
  const counts = weeks
    .flat()
    .filter((d) => d.slot === "day")
    .map((d) => d.contributionCount)
    .filter((n) => n > 0)

  if (!counts.length) return [1, 4, 8, 14]

  const sorted = [...counts].sort((a, b) => a - b)
  const q = (p: number) =>
    sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))] ?? 1

  return [1, Math.max(2, q(0.25)), Math.max(4, q(0.5)), Math.max(8, q(0.75))]
}

function cellClass(day: GridDay, levels: number[]): string {
  if (day.slot === "padding") return "bg-transparent"
  if (day.slot === "future") return "bg-primary/14 dark:bg-primary/20"
  if (day.contributionCount === 0) return "bg-muted/80 dark:bg-muted/50"
  if (day.contributionCount < levels[0]) return "bg-primary/30"
  if (day.contributionCount < levels[1]) return "bg-primary/45"
  if (day.contributionCount < levels[2]) return "bg-primary/65"
  if (day.contributionCount < levels[3]) return "bg-primary/85"
  return "bg-primary"
}

export function ContributionGraphSkeleton({ embedded }: { embedded?: boolean }) {
  return (
    <div
      className={cn(
        "border-t border-border/60 px-6 py-6 sm:px-8 sm:py-7",
        !embedded && "mt-6 animate-pulse rounded-2xl border border-border bg-card"
      )}
    >
      <div className="mb-5 space-y-2">
        <div className="h-3 w-24 rounded bg-muted" />
        <div className="h-8 w-36 rounded bg-muted" />
      </div>
      <div className="h-[100px] w-full rounded-lg bg-muted/60" />
    </div>
  )
}

type ContributionGraphProps = {
  calendar: ContributionCalendar
  profileUrl?: string
  embedded?: boolean
}

export function ContributionGraph({
  calendar,
  profileUrl,
  embedded = false,
}: ContributionGraphProps) {
  const { totalContributions, weeks: apiWeeks } = calendar
  const weeks = normalizeContributionWeeks(apiWeeks)
  const levels = contributionLevels(weeks)

  return (
    <section
      className={cn(
        embedded
          ? "border-t border-border/60 px-6 py-6 sm:px-8 sm:py-7"
          : "portfolio-fade-up mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      )}
      aria-label="GitHub contribution activity"
    >
      <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Activity
          </p>
          <p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-mono text-3xl font-semibold tabular-nums tracking-tight sm:text-4xl">
              {totalContributions.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">
              contributions in the last year
            </span>
          </p>
        </div>
        {profileUrl ? (
          <Link
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-sm text-primary hover:underline"
          >
            View on GitHub →
          </Link>
        ) : null}
      </div>

      <ContributionGraphGrid weeks={weeks} levels={levels} />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-muted-foreground">
        <p className="max-w-md text-pretty leading-relaxed">
          Commit, PR, issue, and review activity from the last 12 months.
        </p>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {[0, levels[0], levels[1], levels[2], levels[3]].map((n) => (
            <div
              key={n}
              className={cn(
                CELL,
                cellClass({ date: "", contributionCount: n, slot: "day" }, levels)
              )}
              aria-hidden
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </section>
  )
}
