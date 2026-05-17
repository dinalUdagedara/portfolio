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
        weeks { contributionDays { contributionCount date } }
      }
    }
  }
  user(login: $login) {
    contributionsCollection {
      contributionCalendar { totalContributions }
    }
  }
}`

export async function fetchContributions(username: string): Promise<ContributionCalendar | null> {
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
    next: { revalidate: 3600 },
  })

  const bodyText = await res.text()
  let json: ContributionsGraphQLResponse

  try {
    json = JSON.parse(bodyText) as ContributionsGraphQLResponse
  } catch {
    githubDebug("fetchContributions:parse-error", {
      login,
      status: res.status,
      statusText: res.statusText,
      bodyPreview: bodyText.slice(0, 200),
    })
    return null
  }

  if (!res.ok) {
    githubDebug("fetchContributions:http-error", {
      login,
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

  githubDebug("fetchContributions:ok", {
    login,
    viewerLogin,
    totalContributions: calendar.totalContributions,
    publicTotal,
    weekCount: calendar.weeks?.length ?? 0,
    dayCount: (calendar.weeks ?? []).reduce(
      (n, w) => n + w.contributionDays.length,
      0
    ),
  })

  return calendar
}

export function normalizeBlogUrl(blog: string | null): string | null {
  if (!blog?.trim()) return null
  const b = blog.trim()
  if (b.startsWith("http://") || b.startsWith("https://")) return b
  return `https://${b}`
}
