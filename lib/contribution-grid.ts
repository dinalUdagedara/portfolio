import type { ContributionCalendar, ContributionDay } from "@/lib/github"

export type GridDay = {
  date: string
  contributionCount: number
  slot: "padding" | "future" | "day"
}

export function parseUtcDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

export function formatUtcDate(date: Date): string {
  const y = date.getUTCFullYear()
  const m = String(date.getUTCMonth() + 1).padStart(2, "0")
  const d = String(date.getUTCDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export function todayUtc(): string {
  return formatUtcDate(new Date())
}

function dayWeekday(day: ContributionDay): number {
  if (day.weekday >= 0 && day.weekday <= 6) return day.weekday
  return parseUtcDate(day.date).getUTCDay()
}

function weekSundayUtc(days: ContributionDay[]): Date {
  const ref = days[0]
  const sunday = parseUtcDate(ref.date)
  sunday.setUTCDate(sunday.getUTCDate() - dayWeekday(ref))
  return sunday
}

/** Place each API day on its GitHub weekday row (Sun=0) so columns match github.com. */
export function normalizeContributionWeeks(
  weeks: ContributionCalendar["weeks"]
): GridDay[][] {
  const today = todayUtc()
  const allDates = weeks
    .flatMap((w) => w.contributionDays.map((d) => d.date))
    .sort()

  if (!allDates.length) return []

  const rangeStart = allDates[0]
  const rangeEnd = allDates[allDates.length - 1]

  return weeks.map((week) => {
    const days = week.contributionDays
    if (!days.length) {
      return Array.from({ length: 7 }, () => ({
        date: "",
        contributionCount: 0,
        slot: "padding" as const,
      }))
    }

    const sunday = weekSundayUtc(days)
    const byWeekday = new Map(days.map((d) => [dayWeekday(d), d]))

    return Array.from({ length: 7 }, (_, dow) => {
      const apiDay = byWeekday.get(dow)
      const cell = new Date(sunday)
      cell.setUTCDate(sunday.getUTCDate() + dow)
      const date = apiDay?.date ?? formatUtcDate(cell)
      const contributionCount = apiDay?.contributionCount ?? 0

      if (date < rangeStart || date > rangeEnd) {
        return { date, contributionCount: 0, slot: "padding" }
      }
      if (date > today) {
        return { date, contributionCount: 0, slot: "future" }
      }
      return { date, contributionCount, slot: "day" }
    })
  })
}

/** Hover label matching github.com, e.g. "12 contributions on Friday, May 16, 2026." */
export function contributionDayLabel(day: GridDay): string {
  if (day.slot === "padding" || !day.date) return ""

  const weekday = parseUtcDate(day.date).toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "UTC",
  })
  const datePart = parseUtcDate(day.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })

  if (day.slot === "future" || day.contributionCount === 0) {
    return `No contributions on ${weekday}, ${datePart}.`
  }

  const n = day.contributionCount.toLocaleString()
  const unit = day.contributionCount === 1 ? "contribution" : "contributions"
  return `${n} ${unit} on ${weekday}, ${datePart}.`
}

/** Label weeks that contain the 1st of a month (same rule as github.com). */
export function monthLabelForWeek(week: GridDay[], weekIndex: number): string | null {
  for (const day of week) {
    if (day.slot === "padding" || !day.date) continue
    if (parseUtcDate(day.date).getUTCDate() === 1) {
      return parseUtcDate(day.date).toLocaleDateString("en-US", {
        month: "short",
        timeZone: "UTC",
      })
    }
  }

  if (weekIndex === 0) {
    const first = week.find((d) => d.date && d.slot !== "padding")
    if (first) {
      return parseUtcDate(first.date).toLocaleDateString("en-US", {
        month: "short",
        timeZone: "UTC",
      })
    }
  }

  return null
}
