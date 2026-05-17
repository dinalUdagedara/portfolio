export const site = {
  name: "Dinal Udagedara",
  role: "Software engineer",
  /** One scannable line: outcome or niche (shown above the name in the hero). */
  hook: "I ship web products that stay fast, accessible, and easy to evolve.",
  tagline:
    "I build reliable web products with clear UX, solid TypeScript, and performance in mind.",
  email: "you@example.com",
  /** Used for the GitHub API section (`lib/github.ts`). Must match your handle. */
  githubUsername: "dinalUdagedara",
  /** Used for the Writing section (`lib/medium.ts`). Without the leading @. */
  mediumUsername: "dinal.bandara",
  links: {
    github: "https://github.com/dinalUdagedara",
    linkedin: "https://www.linkedin.com/in/dinaludagedara/",
  },
  /** Static file under `public/assets/images/`. */
  portraitImage: "/assets/images/portrait.jpeg",
  /** Optional X/Twitter handle for `twitter.creator` (with or without leading @). */
  twitterHandle: "",
  /** Used for `<meta name="keywords">` and similar. */
  keywords: [
    "Dinal Udagedara",
    "software engineer",
    "portfolio",
    "TypeScript",
    "Next.js",
    "React",
    "Tailwind CSS",
    "web development",
  ],
} as const

export type Project = {
  title: string
  description: string
  href: string
  tags: string[]
}

export const projects: Project[] = [
  {
    title: "Project one",
    description:
      "Short outcome-focused blurb: what it does, who it’s for, and what you owned end-to-end.",
    href: "#",
    tags: ["Next.js", "TypeScript"],
  },
  {
    title: "Project two",
    description:
      "Another 1–2 lines. Prefer metrics or constraints (latency, scale, accessibility) when you can.",
    href: "#",
    tags: ["React", "Tailwind CSS"],
  },
]

export type ExperienceItem = {
  title: string
  company: string
  period: string
  highlights: string[]
}

export const experience: ExperienceItem[] = [
  {
    title: "Your role",
    company: "Company",
    period: "20XX — Present",
    highlights: [
      "Shipped a feature that improved a measurable outcome (replace with your real impact).",
      "Led or collaborated across design, backend, and infra (tune to your story).",
    ],
  },
]
