import type { ContributionCalendar } from "@/lib/github"

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

/** Pad each API week to Sun–Sat so columns align like github.com. */
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
    const byDate = new Map(
      week.contributionDays.map((d) => [d.date, d.contributionCount])
    )
    const anchor = week.contributionDays[0]?.date
    if (!anchor) {
      return Array.from({ length: 7 }, () => ({
        date: "",
        contributionCount: 0,
        slot: "padding" as const,
      }))
    }

    const anchorDate = parseUtcDate(anchor)
    const sunday = new Date(anchorDate)
    sunday.setUTCDate(anchorDate.getUTCDate() - anchorDate.getUTCDay())

    return Array.from({ length: 7 }, (_, dow) => {
      const cell = new Date(sunday)
      cell.setUTCDate(sunday.getUTCDate() + dow)
      const date = formatUtcDate(cell)
      const contributionCount = byDate.get(date) ?? 0

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

export function monthLabelForWeek(week: GridDay[], prevWeek: GridDay[] | null): string | null {
  const sunday = week[0]?.date
  if (!sunday) return null

  const month = parseUtcDate(sunday).getUTCMonth()
  const prevSunday = prevWeek?.[0]?.date
  const prevMonth = prevSunday ? parseUtcDate(prevSunday).getUTCMonth() : null

  if (prevMonth === null || month !== prevMonth) {
    return parseUtcDate(sunday).toLocaleDateString("en-US", {
      month: "short",
      timeZone: "UTC",
    })
  }
  return null
}
