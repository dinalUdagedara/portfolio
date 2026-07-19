import { unstable_cache } from "next/cache"

const GITHUB_LOG_PREFIX = "[github]"

function githubDebug(label: string, payload: Record<string, unknown>) {
  const enabled =
    process.env.GITHUB_DEBUG === "true" || process.env.NODE_ENV === "development"
  if (!enabled) return
  console.log(`${GITHUB_LOG_PREFIX} ${label}`, payload)
}

/** Subset of GET /users/{username} (GitHub REST API). */
export type GithubPublicUser = {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  company: string | null
  blog: string | null
  location: string | null
}

export async function fetchGithubUser(username: string): Promise<GithubPublicUser | null> {
  const trimmed = username.trim()
  if (!trimmed) return null

  const token = process.env.GITHUB_TOKEN
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    /** GitHub requires a descriptive User-Agent for API requests. */
    "User-Agent": "dinal-udagedara-portfolio",
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`https://api.github.com/users/${encodeURIComponent(trimmed)}`, {
    headers,
    next: { revalidate: 3600 },
  })

  if (!res.ok) return null
  return (await res.json()) as GithubPublicUser
}

export type ContributionDay = {
  date: string
  contributionCount: number
  /** 0 = Sunday … 6 = Saturday (GitHub GraphQL) */
  weekday: number
}

export type ContributionCalendar = {
  totalContributions: number
  weeks: Array<{ contributionDays: ContributionDay[] }>
}

type ContributionsGraphQLResponse = {
  data?: {
    viewer?: {
      login: string
      contributionsCollection?: {
        contributionCalendar?: ContributionCalendar
      }
    } | null
    user?: {
      contributionsCollection?: {
        contributionCalendar?: Pick<ContributionCalendar, "totalContributions">
      }
    } | null
  }
  errors?: Array<{ message: string; type?: string }>
}

const CONTRIBUTIONS_QUERY = `query($login: String!) {
  viewer {
    login
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { contributionCount date weekday } }
      }
    }
  }
  user(login: $login) {
    contributionsCollection {
      contributionCalendar { totalContributions }
    }
  }
}`

/**
 * GitHub's GraphQL resolver for `contributionsCollection` is expensive and
 * intermittently fails with RESOURCE_LIMITS_EXCEEDED even well within rate
 * limits — retrying the same request a few requests later routinely
 * succeeds. Retry here (build/revalidation time only, not per page view) so
 * a transient failure doesn't get cached for the full revalidate window.
 */
const MAX_ATTEMPTS = 4
const RETRY_DELAY_MS = 400

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const fetchContributions = unstable_cache(
  fetchContributionsWithRetry,
  ["github-contributions"],
  { revalidate: 3600 }
)

async function fetchContributionsWithRetry(username: string): Promise<ContributionCalendar | null> {
  const login = username.trim()
  const token = process.env.GITHUB_TOKEN

  githubDebug("fetchContributions:start", {
    login,
    hasToken: Boolean(token),
    tokenLength: token?.length ?? 0,
  })

  if (!token) {
    githubDebug("fetchContributions:skip", {
      reason: "GITHUB_TOKEN is not set",
    })
    return null
  }

  if (!login) {
    githubDebug("fetchContributions:skip", {
      reason: "username is empty",
    })
    return null
  }

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const calendar = await fetchContributionsOnce(login, token, attempt)
    if (calendar) return calendar
    if (attempt < MAX_ATTEMPTS) await sleep(RETRY_DELAY_MS * attempt)
  }

  githubDebug("fetchContributions:exhausted", { login, attempts: MAX_ATTEMPTS })
  return null
}

async function fetchContributionsOnce(
  login: string,
  token: string,
  attempt: number
): Promise<ContributionCalendar | null> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "dinal-udagedara-portfolio",
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: { login },
    }),
    cache: "no-store",
  })

  const bodyText = await res.text()
  let json: ContributionsGraphQLResponse

  try {
    json = JSON.parse(bodyText) as ContributionsGraphQLResponse
  } catch {
    githubDebug("fetchContributions:parse-error", {
      login,
      attempt,
      status: res.status,
      statusText: res.statusText,
      bodyPreview: bodyText.slice(0, 200),
    })
    return null
  }

  if (!res.ok) {
    githubDebug("fetchContributions:http-error", {
      login,
      attempt,
      status: res.status,
      statusText: res.statusText,
      errors: json.errors?.map((e) => e.message),
      bodyPreview: bodyText.slice(0, 300),
    })
    return null
  }

  if (json.errors?.length) {
    githubDebug("fetchContributions:graphql-errors", {
      login,
      attempt,
      status: res.status,
      errors: json.errors.map((e) => ({
        message: e.message,
        type: e.type,
      })),
    })
  }

  const viewer = json.data?.viewer
  const viewerLogin = viewer?.login
  const viewerCalendar =
    viewer?.contributionsCollection?.contributionCalendar ?? null
  const publicTotal =
    json.data?.user?.contributionsCollection?.contributionCalendar
      ?.totalContributions

  if (!viewer) {
    githubDebug("fetchContributions:no-viewer", {
      login,
      attempt,
      hint: "Token could not authenticate — check GITHUB_TOKEN is valid",
    })
    return null
  }

  if (viewerLogin && viewerLogin.toLowerCase() !== login.toLowerCase()) {
    githubDebug("fetchContributions:login-mismatch", {
      login,
      viewerLogin,
      hint: "GITHUB_TOKEN belongs to a different GitHub account than site.githubUsername",
    })
  }

  if (
    publicTotal != null &&
    viewerCalendar &&
    publicTotal < viewerCalendar.totalContributions
  ) {
    githubDebug("fetchContributions:includes-private", {
      login,
      publicTotal,
      viewerTotal: viewerCalendar.totalContributions,
    })
  } else if (
    publicTotal != null &&
    viewerCalendar &&
    publicTotal === viewerCalendar.totalContributions &&
    publicTotal < 2500
  ) {
    githubDebug("fetchContributions:scope-hint", {
      login,
      totalContributions: publicTotal,
      hint:
        "If github.com shows a higher total, regenerate GITHUB_TOKEN with classic repo + read:user scopes (or fine-grained read on private org repos) and enable “Include private contributions” on your GitHub profile.",
    })
  }

  const calendar = viewerCalendar

  if (!calendar) {
    githubDebug("fetchContributions:no-calendar", {
      login,
      viewerLogin,
    })
    return null
  }

  const weekCount = calendar.weeks?.length ?? 0
  const dayCount = (calendar.weeks ?? []).reduce(
    (n, w) => n + w.contributionDays.length,
    0
  )

  githubDebug("fetchContributions:ok", {
    login,
    attempt,
    viewerLogin,
    totalContributions: calendar.totalContributions,
    publicTotal,
    weekCount,
    dayCount,
  })

  logContributionCalendarApi(calendar)

  return calendar
}

function logContributionCalendarApi(calendar: ContributionCalendar) {
  const weeks = calendar.weeks ?? []
  const allDays = weeks.flatMap((week, weekIndex) =>
    week.contributionDays.map((day) => ({ weekIndex, ...day }))
  )
  const dates = allDays.map((d) => d.date).sort()
  const serverNow = new Date().toISOString()

  githubDebug("fetchContributions:api-range", {
    serverNow,
    firstDate: dates[0] ?? null,
    lastDate: dates.at(-1) ?? null,
    totalWeeks: weeks.length,
    totalDays: allDays.length,
  })

  const summarizeWeek = (weekIndex: number) => {
    const days = weeks[weekIndex]?.contributionDays ?? []
    return {
      weekIndex,
      dayCount: days.length,
      dates: days.map((d) => d.date),
      weekdays: days.map((d) => d.weekday),
      counts: days.map((d) => d.contributionCount),
    }
  }

  githubDebug("fetchContributions:api-first-weeks", {
    weeks: [0, 1, 2].filter((i) => i < weeks.length).map(summarizeWeek),
  })

  githubDebug("fetchContributions:api-last-weeks", {
    weeks: [weeks.length - 3, weeks.length - 2, weeks.length - 1]
      .filter((i) => i >= 0)
      .map(summarizeWeek),
  })

  const lastWeek = weeks[weeks.length - 1]
  if (lastWeek) {
    githubDebug("fetchContributions:api-last-week-detail", {
      days: lastWeek.contributionDays.map((d) => ({
        date: d.date,
        weekday: d.weekday,
        weekdayName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.weekday],
        contributionCount: d.contributionCount,
      })),
    })
  }

  const daysWithActivity = allDays
    .filter((d) => d.contributionCount > 0)
    .map((d) => d.date)
  githubDebug("fetchContributions:api-last-activity", {
    lastDateWithContributions: daysWithActivity.at(-1) ?? null,
    lastFiveActiveDates: daysWithActivity.slice(-5),
  })
}

export function normalizeBlogUrl(blog: string | null): string | null {
  if (!blog?.trim()) return null
  const b = blog.trim()
  if (b.startsWith("http://") || b.startsWith("https://")) return b
  return `https://${b}`
}
