"use client"

import { ContributionGraphScroll } from "@/components/portfolio/contribution-graph-scroll"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  type GridDay,
  contributionDayLabel,
  monthLabelForWeek,
} from "@/lib/contribution-grid"
import { cn } from "@/lib/utils"

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const VISIBLE_DAYS = ["", "Mon", "", "Wed", "", "Fri", ""]
const CELL = "h-[11px] w-[11px] rounded-[3px] sm:h-3 sm:w-3"
const GAP = "gap-[3px] sm:gap-1"

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

type ContributionGraphGridProps = {
  weeks: GridDay[][]
  levels: number[]
}

export function ContributionGraphGrid({ weeks, levels }: ContributionGraphGridProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <div
        className={cn(
          "relative -mx-1 rounded-xl bg-muted/30 px-1 py-4 dark:bg-muted/15",
          "sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0"
        )}
      >
        <ContributionGraphScroll>
          <div className="flex min-w-full justify-center">
          <div className="w-max">
            <div className={cn("mb-1.5 flex", GAP)}>
              <div className="mr-1.5 w-8 shrink-0 sm:mr-2 sm:w-9" />
              {weeks.map((week, i) => (
                <div
                  key={i}
                  className="w-[11px] shrink-0 overflow-visible whitespace-nowrap text-[10px] leading-none text-foreground/55 sm:w-3 sm:text-[11px]"
                >
                  {monthLabelForWeek(week, i, i > 0 ? weeks[i - 1] : null) ?? ""}
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
                  {week.map((day, di) => {
                    const label = contributionDayLabel(day)
                    const interactive = day.slot !== "padding" && Boolean(day.date)

                    const cell = (
                      <button
                        type="button"
                        tabIndex={interactive ? 0 : -1}
                        disabled={!interactive}
                        className={cn(
                          CELL,
                          "p-0",
                          interactive &&
                            "cursor-pointer transition-[transform,opacity] hover:scale-110 hover:opacity-90 motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                          !interactive && "cursor-default",
                          cellClass(day, levels)
                        )}
                        aria-label={
                          interactive ? `${DAY_LABELS[di]}, ${label}` : undefined
                        }
                      />
                    )

                    if (!interactive) {
                      return <div key={`${wi}-${di}`}>{cell}</div>
                    }

                    return (
                      <Tooltip key={`${wi}-${di}`}>
                        <TooltipTrigger asChild>{cell}</TooltipTrigger>
                        <TooltipContent side="top" sideOffset={6} className="font-medium">
                          {label}
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
          </div>
        </ContributionGraphScroll>
      </div>
    </TooltipProvider>
  )
}
