export const site = {
  name: "Dinal Udagedara",
  role: "Software engineer",
  /** One scannable line: outcome or niche (shown above the name in the hero). */
  hook: "Full-stack engineer shipping AI-powered products and Web3-integrated platforms.",
  /** Short line for metadata (manifest, Open Graph, JSON-LD). */
  tagline:
    "Software Engineer at Perfectus · Full-stack, AI, and Web3 developer.",
  /** Hero bio beside portrait — keep to 1–2 short sentences. */
  bio: "Software Engineer at Perfectus building full-stack web apps with AI pipelines and Web3 integration. I also freelance on production products across the full stack.",
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
  /** Static file under `public/assets/`. */
  resumeUrl: "/assets/Dinal_Udagedara.pdf",
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

export type GitHubLink = {
  label: string
  href: string
}

export type Project = {
  slug: string
  title: string
  description: string
  longDescription: string
  liveUrl?: string
  githubLinks?: GitHubLink[]
  tags: string[]
  screenshots?: string[]
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: "showdown",
    title: "Showdown",
    description:
      "No-limit Texas Hold'em in the browser — practise against equity-aware bots, or open a room and deal friends in over a link.",
    longDescription:
      "Showdown is a full no-limit Texas Hold'em table built with Next.js 16, React 19, TypeScript, and Tailwind CSS, with Redis-backed multiplayer over server-sent events. The poker engine is a pure, deterministic state machine — hand ranking, side pots, blinds that rise, and a turn clock — kept separate from HTTP and storage so multiplayer could land without changing a line of the core rules. Hole cards are redacted per viewer before anything leaves the server, so the browser never receives a card it is not entitled to see. Bots open with a Chen-formula range preflop and switch to Monte Carlo equity from the flop on. Includes a built-in how-to-play guide, public and private rooms for 2–6 seats, bot fill for empty chairs, and rematch into a fresh room when a table finishes.",
    liveUrl: "https://poker.dinaludagedara.com",
    githubLinks: [
      { label: "Repo", href: "https://github.com/dinalUdagedara/poker" },
    ],
    tags: ["Next.js", "TypeScript", "Redis", "SSE", "Tailwind CSS"],
    screenshots: [
      "/assets/projects/poker/Screenshot 2026-08-07 at 15.54.25.png",
      "/assets/projects/poker/Screenshot 2026-08-07 at 15.54.36.png",
      "/assets/projects/poker/Screenshot 2026-08-07 at 15.55.14.png",
      "/assets/projects/poker/Screenshot 2026-08-07 at 15.55.29.png",
      "/assets/projects/poker/Screenshot 2026-08-07 at 15.54.43.png",
      "/assets/projects/poker/Screenshot 2026-08-07 at 15.54.49.png",
      "/assets/projects/poker/Screenshot 2026-08-07 at 15.54.54.png",
      "/assets/projects/poker/Screenshot 2026-08-07 at 15.55.58.png",
    ],
    featured: true,
  },
  {
    slug: "crackint",
    title: "CrackInt",
    description:
      "AI-driven interview preparation platform with personalised question practice, skill gap analysis, and cover letter generation.",
    longDescription:
      "CrackInt is a full-stack AI interview preparation platform built with Next.js and FastAPI, backed by PostgreSQL with modular API routing. I designed and trained a Word2Vec + BiLSTM + CRF NLP pipeline for Named Entity Recognition over résumé and job-posting text, achieving a test micro-F1 of 0.83 on 4,738 annotated résumés and ~0.85 on 6,327 job postings. The platform features an AI tutor chat, targeted interview question practice, skill gap analysis, readiness scoring, and tailored cover letter generation. LLM-enabled features are controlled through configuration flags for reliable deployment flexibility.",
    liveUrl: "https://crackint.dinaludagedara.com",
    githubLinks: [
      { label: "Frontend", href: "https://github.com/dinalUdagedara/crackint-frontend" },
      { label: "Backend", href: "https://github.com/dinalUdagedara/crackint-backend" },
    ],
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Python", "NLP", "AI/LLM"],
    screenshots: [
      "/assets/projects/crackint/Screenshot 2026-06-02 at 00.01.16.png",
      "/assets/projects/crackint/Screenshot 2026-06-02 at 00.01.54.png",
      "/assets/projects/crackint/Screenshot 2026-06-02 at 00.02.06.png",
      "/assets/projects/crackint/Screenshot 2026-06-02 at 00.02.23.png",
      "/assets/projects/crackint/Screenshot 2026-06-02 at 00.02.34.png",
      "/assets/projects/crackint/Screenshot 2026-06-02 at 00.03.52.png",
    ],
    featured: true,
  },
  {
    slug: "omi-card-game",
    title: "Omi Card Game",
    description:
      "Real-time multiplayer digital version of Omi, a popular Sri Lankan trick-taking card game, with AI opponents and private rooms.",
    longDescription:
      "A personal hobby project — a digital implementation of Omi, a popular Sri Lankan trick-taking card game. Built with Next.js 14, TypeScript, Tailwind CSS, and Convex for a real-time reactive multiplayer backend. Supports practice mode against AI opponents (fully client-side) and online multiplayer with public and private rooms for up to 4 players. Includes an auto-playing bot fallback when a player disconnects mid-game, with seamless rejoin capability.",
    liveUrl: "https://omi.dinaludagedara.com",
    githubLinks: [
      { label: "Repo", href: "https://github.com/dinalUdagedara/omi" },
    ],
    tags: ["Next.js", "TypeScript", "Convex", "Tailwind CSS"],
    screenshots: [
      "/assets/projects/omi/Screenshot 2026-06-02 at 00.05.13.png",
      "/assets/projects/omi/Screenshot 2026-06-02 at 00.05.21.png",
      "/assets/projects/omi/Screenshot 2026-06-02 at 00.05.40.png",
      "/assets/projects/omi/Screenshot 2026-06-02 at 00.05.42.png",
      "/assets/projects/omi/Screenshot 2026-06-02 at 00.06.57.png",
      "/assets/projects/omi/Screenshot 2026-06-02 at 00.07.03.png",
    ],
    featured: true,
  },
  {
    slug: "sri-grow",
    title: "Sri Grow",
    description:
      "Agricultural advisory web app for rural Sri Lanka with ML-based precipitation forecasting, pest alerts, and market price tracking.",
    longDescription:
      "A full-stack agricultural advisory web app targeting rural agricultural officers in Sri Lanka, supporting crop planning, pest alerts, and market price tracking. I trained a Random Forest Regressor on a custom Sri Lanka weather dataset to predict maximum precipitation by city and date range, enabling data-driven crop scheduling. Served the ML model as a Python Flask microservice alongside a Node.js/Express backend and React frontend — a 3-tier architecture with a separate ML inference layer. Features include live weather forecasting, crop-specific soil and weather guidance, real-time pest alerts, and current market prices sourced from structured datasets.",
    liveUrl: "https://sri-grow.vercel.app",
    githubLinks: [
      { label: "Repo", href: "https://github.com/dinalUdagedara/sri-grow" },
    ],
    tags: ["React", "Node.js", "Flask", "Python", "Machine Learning"],
    screenshots: [
      "/assets/projects/sri-grow/Screenshot 2026-06-02 at 00.07.46.png",
    ],
    featured: false,
  },
  {
    slug: "tasker",
    title: "Tasker",
    description:
      "All-in-one productivity and collaboration platform with notes, tasks, project planning, and real-time team sync.",
    longDescription:
      "A full-stack productivity platform built with Next.js 14, TypeScript, Tailwind CSS, and Convex for real-time data sync. Features note-taking, task management, project planning, and real-time team collaboration in a single unified workspace. Implements authentication via Clerk and uses shadcn/ui for a polished, accessible component system. Deployed on Vercel with a responsive UI designed for both personal and team workflows.",
    liveUrl: "https://tasker-ten-omega.vercel.app",
    githubLinks: [
      { label: "Repo", href: "https://github.com/dinalUdagedara/tasker" },
    ],
    tags: ["Next.js", "TypeScript", "Convex", "Clerk", "Tailwind CSS"],
    screenshots: [
      "/assets/projects/tasker/Screenshot 2026-06-02 at 00.10.01.png",
    ],
    featured: false,
  },
  {
    slug: "srt-lyric-player",
    title: "srt-lyric-player",
    description:
      "Spotify-style music player with real-time synchronized lyrics driven by .srt subtitle files, published as an npm package.",
    longDescription:
      "Built a Spotify-style music player with real-time synchronized lyrics driven by standard .srt subtitle files, and published the result as the srt-lyric-player npm package. Engineered real-time lyric sync using Howler.js for audio playback, Framer Motion for lyric transition animations, and Web Audio API for a canvas-based audio visualizer. Structured as a Next.js 15 monorepo with the package bundled via tsup (ESM + CJS + TypeScript types) and deployed live on Vercel as an interactive demo.",
    liveUrl: "https://srt-to-lyrics-ebon.vercel.app",
    githubLinks: [
      { label: "GitHub", href: "https://github.com/dinalUdagedara/srt-to-lyrics" },
      { label: "npm", href: "https://www.npmjs.com/package/srt-lyric-player" },
    ],
    tags: ["Next.js", "TypeScript", "npm Package", "Howler.js", "Framer Motion"],
    screenshots: [
      "/assets/projects/srt-player/Screenshot 2026-06-02 at 00.10.43.png",
      "/assets/projects/srt-player/Screenshot 2026-06-02 at 00.12.22.png",
      "/assets/projects/srt-player/Screenshot 2026-06-02 at 00.12.27.png",
      "/assets/projects/srt-player/Screenshot 2026-06-02 at 00.12.30.png",
      "/assets/projects/srt-player/Screenshot 2026-06-02 at 00.12.33.png",
      "/assets/projects/srt-player/Screenshot 2026-06-02 at 00.12.35.png",
    ],
    featured: false,
  },
]

export type SkillGroup = {
  category: string
  items: string[]
}

export const skills: SkillGroup[] = [
  { category: "Languages", items: ["TypeScript", "JavaScript", "Python", "Kotlin", "Java"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"] },
  { category: "Backend", items: ["Node.js", "Express.js", "NestJS", "FastAPI"] },
  { category: "Database", items: ["PostgreSQL", "MongoDB", "SQL"] },
  {
    category: "Web3 / Blockchain",
    items: ["Smart Contract Integration", "Web3.js", "Ethers.js"],
  },
  {
    category: "AI / LLM",
    items: ["RAG Systems", "Prompt Engineering", "AI Agent Design", "LangChain", "OpenAI", "Gemini"],
  },
  { category: "Cloud & DevOps", items: ["AWS", "Docker", "Git", "GitHub"] },
]

export type EducationItem = {
  degree: string
  programme: string
  institution: string
  honours?: string
  period: string
}

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Engineering",
    programme: "Software Engineering with Industrial Placement",
    institution: "University of Westminster",
    honours: "First Class Honours",
    period: "Graduated June 2026",
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
    title: "Software Engineer",
    company: "Perfectus",
    period: "Feb 2025 — Present",
    highlights: [
      "Promoted to Software Engineer after an 11-month internship, shipping production features across Next.js frontends and NestJS / FastAPI backends.",
      "Integrate smart contracts into web platforms, connecting on-chain logic with Web2 backends and frontends as part of the team's Web3 work.",
      "Architect RESTful APIs and backend services, and manage MongoDB / PostgreSQL databases with schema migrations via Alembic; deploy and maintain services on AWS with Docker.",
      "Build AI-powered features — RAG pipelines, prompt engineering, and AI agent workflows — while owning client communication, requirements gathering, and iterative delivery.",
    ],
  },
  {
    title: "Freelance Software Engineer",
    company: "Independent — US Client (Remote)",
    period: "2025 — Present",
    highlights: [
      "Serving as the primary software engineer for a US-based AI music generation and streaming platform, from backend APIs to frontend UI.",
      "Leading end-to-end feature development independently — architecting solutions and defining technical requirements directly with the client.",
      "Building and integrating AI-powered music generation capabilities into a scalable streaming platform.",
    ],
  },
  {
    title: "Software Engineering Intern",
    company: "Perfectus",
    period: "Mar 2024 — Jan 2025 (11 months)",
    highlights: [
      "Completed an 11-month industrial placement as part of the BEng (Hons) Software Engineering programme at IIT.",
      "Contributed to full-stack development across multiple client projects, gaining hands-on production experience.",
      "Worked on Web3-enabled web applications, integrating smart contracts on both frontend and backend.",
      "Collaborated with senior engineers to deliver features, fix bugs, and improve code quality across the codebase.",
    ],
  },
]
