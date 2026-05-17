import Link from "next/link"

import type { ContributionCalendar } from "@/lib/github"
import { cn } from "@/lib/utils"

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const VISIBLE_DAYS = ["", "Mon", "", "Wed", "", "Fri", ""]
const CELL = "h-[11px] w-[11px] rounded-[3px] sm:h-3 sm:w-3"
const GAP = "gap-[3px] sm:gap-1"
const WEEK_W = "w-[14px] sm:w-4"

function contributionLevels(weeks: ContributionCalendar["weeks"]): number[] {
  const counts = weeks.flatMap((w) =>
    w.contributionDays.map((d) => d.contributionCount).filter((n) => n > 0)
  )
  if (!counts.length) return [1, 4, 8, 14]

  const sorted = [...counts].sort((a, b) => a - b)
  const q = (p: number) =>
    sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))] ?? 1

  return [1, Math.max(2, q(0.25)), Math.max(4, q(0.5)), Math.max(8, q(0.75))]
}

function cellClass(count: number, levels: number[]): string {
  if (count === 0) return "bg-muted/80 dark:bg-muted/50"
  if (count < levels[0]) return "bg-primary/30"
  if (count < levels[1]) return "bg-primary/45"
  if (count < levels[2]) return "bg-primary/65"
  if (count < levels[3]) return "bg-primary/85"
  return "bg-primary"
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
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
  const { totalContributions, weeks } = calendar
  const levels = contributionLevels(weeks)

  const monthLabels = new Map<number, string>()
  weeks.forEach((week, i) => {
    if (!week.contributionDays.length) return
    const d = new Date(week.contributionDays[0].date)
    const prev = i > 0 ? new Date(weeks[i - 1].contributionDays[0].date) : null
    if (!prev || prev.getMonth() !== d.getMonth()) {
      monthLabels.set(i, d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }))
    }
  })

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

      <div
        className={cn(
          "relative -mx-1 rounded-xl bg-muted/30 px-1 py-4 dark:bg-muted/15",
          "sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0"
        )}
      >
        <div className="overflow-x-auto pb-1 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto w-max">
            <div className={cn("mb-1.5 flex", GAP)}>
              <div className="mr-1.5 w-8 shrink-0 sm:mr-2 sm:w-9" />
              {weeks.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    WEEK_W,
                    "shrink-0 text-[10px] leading-none text-foreground/55 sm:text-[11px]"
                  )}
                >
                  {monthLabels.get(i) ?? ""}
                </div>
              ))}
            </div>

            <div className={cn("flex", GAP)}>
              <div className={cn("mr-1.5 flex w-8 shrink-0 flex-col sm:mr-2 sm:w-9", GAP)}>
                {VISIBLE_DAYS.map((label, i) => (
                  <div
                    key={i}
                    className={cn(
                      CELL,
                      "flex items-center justify-end text-[10px] leading-none text-foreground/55 sm:text-[11px]"
                    )}
                  >
                    {label}
                  </div>
                ))}
              </div>

              {weeks.map((week, wi) => (
                <div key={wi} className={cn("flex flex-col", GAP)}>
                  {week.contributionDays.map((day, di) => (
                    <div
                      key={di}
                      className={cn(
                        CELL,
                        "transition-[transform,opacity] hover:scale-110 hover:opacity-90 motion-reduce:transform-none",
                        cellClass(day.contributionCount, levels)
                      )}
                      title={`${formatDate(day.date)}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`}
                      aria-label={`${DAY_LABELS[di]}, ${formatDate(day.date)}: ${day.contributionCount} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-muted-foreground">
        <p className="max-w-md text-pretty leading-relaxed">
          Commit, PR, issue, and review activity from the last 12 months.
        </p>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {[0, levels[0], levels[1], levels[2], levels[3]].map((n) => (
            <div key={n} className={cn(CELL, cellClass(n, levels))} aria-hidden />
          ))}
          <span>More</span>
        </div>
      </div>
    </section>
  )
}
