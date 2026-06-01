import type { Metadata } from "next"

import { ProjectCard } from "@/components/portfolio/project-card"
import { PortfolioSection, SectionTitle } from "@/components/portfolio/section"
import { SiteFooter } from "@/components/portfolio/site-footer"
import { SiteHeader } from "@/components/portfolio/site-header"
import { site, projects } from "@/lib/site"

export const metadata: Metadata = {
  title: "Projects",
  description: `All projects by ${site.name} — full-stack, AI, and Web3 work.`,
  alternates: { canonical: "/projects" },
}

export default function ProjectsPage() {
  return (
    <div className="min-h-svh min-w-0 overflow-x-clip pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <SiteHeader />
      <main>
        <PortfolioSection id="projects" band="default">
          <SectionTitle
            kicker="All work"
            title="Projects"
            description="Everything I've built — production apps, open-source packages, and side projects."
          />
          <ul className="mt-10 flex flex-col gap-4 sm:mt-12 sm:gap-5">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </ul>
        </PortfolioSection>
      </main>
      <SiteFooter />
    </div>
  )
}
