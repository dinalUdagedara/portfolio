export const site = {
  name: "Dinal Udagedara",
  role: "Software engineer",
  /** One scannable line: outcome or niche (shown above the name in the hero). */
  hook: "I ship web products that stay fast, accessible, and easy to evolve.",
  tagline:
    "I build reliable web products with clear UX, solid TypeScript, and performance in mind.",
  email: "dinal.bandara@gmail.com",
  contactIntro:
    "I am always open to new opportunities and collaborations. If you have any questions or would like to get in touch, please feel free to contact me.",
  /** Used for the GitHub API section (`lib/github.ts`). Must match your handle. */
  githubUsername: "dinalUdagedara",
  /** Used for the Writing section (`lib/medium.ts`). Without the leading @. */
  mediumUsername: "dinal.bandara",
  links: {
    github: "https://github.com/dinalUdagedara",
    linkedin: "https://www.linkedin.com/in/dinaludagedara/",
    instagram: "https://www.instagram.com/dinal.udagedara",
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
    title: "Junior Software Engineer",
    company: "Perfectus",
    period: "May 2024 — Present",
    highlights: [
      "Progressed from intern to Associate SE to Junior SE within a year while shipping production features across Next.js frontends and NestJS / FastAPI backends.",
      "Deployed and maintained services on AWS using Docker; managed MongoDB and PostgreSQL databases including schema migrations with Alembic.",
      "Built AI-powered features — RAG pipelines, prompt engineering, and context management — as part of multiple client-facing AI projects.",
      "Owned client communication end-to-end: gathering requirements, planning and prioritising features, coordinating QA, and delivering iterative releases.",
    ],
  },
  {
    title: "Full Stack Engineer",
    company: "Freelance",
    period: "2025 — Present",
    highlights: [
      "Serving as the primary engineer on a large-scale application, managing the full development lifecycle independently.",
      "Handling direct client collaboration, feature planning, and deployment with no team overhead.",
    ],
  },
]
