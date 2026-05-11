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

export function normalizeBlogUrl(blog: string | null): string | null {
  if (!blog?.trim()) return null
  const b = blog.trim()
  if (b.startsWith("http://") || b.startsWith("https://")) return b
  return `https://${b}`
}
