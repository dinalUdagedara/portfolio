import { Suspense } from "react"

import { Contact } from "@/components/portfolio/contact"
import { Experience } from "@/components/portfolio/experience"
import { GithubProfile, GithubProfileSkeleton } from "@/components/portfolio/github-profile"
import { Hero } from "@/components/portfolio/hero"
import { Projects } from "@/components/portfolio/projects"
import { SiteFooter } from "@/components/portfolio/site-footer"
import { SiteHeader } from "@/components/portfolio/site-header"
import { Writing, WritingSkeleton } from "@/components/portfolio/writing"

export default function Page() {
  return (
    <div className="min-h-svh min-w-0 overflow-x-clip pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <SiteHeader />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Suspense fallback={<GithubProfileSkeleton />}>
          <GithubProfile />
        </Suspense>
        <Suspense fallback={<WritingSkeleton />}>
          <Writing />
        </Suspense>
        <Contact />
      </main>
      <SiteFooter />
      <p className="sr-only">
        Press the letter d to toggle dark mode.
      </p>
    </div>
  )
}
