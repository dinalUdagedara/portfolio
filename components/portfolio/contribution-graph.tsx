import type { ContributionCalendar } from "@/lib/github"
import { cn } from "@/lib/utils"

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const VISIBLE_DAYS = ["", "Mon", "", "Wed", "", "Fri", ""]

function cellClass(count: number): string {
  if (count === 0) return "bg-muted"
  if (count < 4) return "bg-primary/25"
  if (count < 8) return "bg-primary/50"
  if (count < 14) return "bg-primary/75"
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

export function ContributionGraphSkeleton() {
  return (
    <div className="mt-6 animate-pulse rounded-2xl border border-border bg-card p-6">
      <div className="mb-4 flex items-baseline gap-2">
        <div className="h-7 w-16 rounded bg-muted" />
        <div className="h-3 w-40 rounded bg-muted" />
      </div>
      <div className="h-[88px] w-full rounded-lg bg-muted" />
    </div>
  )
}

export function ContributionGraph({ calendar }: { calendar: ContributionCalendar }) {
  const { totalContributions, weeks } = calendar

  // Compute month label positions — label appears at the first week of each month
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
    <div className="portfolio-fade-up mt-6 rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="mb-4 flex items-baseline gap-2">
        <span className="font-mono text-2xl font-semibold tabular-nums">
          {totalContributions.toLocaleString()}
        </span>
        <span className="text-xs text-muted-foreground">contributions in the last year</span>
      </div>

      <div className="overflow-x-auto">
        <div className="w-max">
          {/* Month labels row */}
          <div className="mb-1 flex">
            {/* Spacer for day-label column */}
            <div className="mr-2 w-7 shrink-0" />
            {weeks.map((_, i) => (
              <div
                key={i}
                className="w-[13px] shrink-0 text-[9px] leading-none text-muted-foreground"
              >
                {monthLabels.get(i) ?? ""}
              </div>
            ))}
          </div>

          {/* Day labels + cell grid */}
          <div className="flex gap-[3px]">
            {/* Day labels column */}
            <div className="mr-2 flex w-7 shrink-0 flex-col gap-[3px]">
              {VISIBLE_DAYS.map((label, i) => (
                <div
                  key={i}
                  className="flex h-[10px] items-center justify-end text-[9px] leading-none text-muted-foreground"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Week columns */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.contributionDays.map((day, di) => (
                  <div
                    key={di}
                    className={cn("h-[10px] w-[10px] rounded-[2px] transition-opacity hover:opacity-70", cellClass(day.contributionCount))}
                    title={`${formatDate(day.date)}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`}
                    aria-label={`${DAY_LABELS[di]}, ${formatDate(day.date)}: ${day.contributionCount} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-end gap-1.5 text-[9px] text-muted-foreground">
        <span>Less</span>
        {[0, 1, 4, 8, 14].map((n) => (
          <div key={n} className={cn("h-[10px] w-[10px] rounded-[2px]", cellClass(n))} />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}
