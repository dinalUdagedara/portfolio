import Link from "next/link"

import { ProjectCard } from "@/components/portfolio/project-card"
import { PortfolioSection, SectionTitle } from "@/components/portfolio/section"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/site"

export function Projects() {
  const featured = projects.filter((p) => p.featured)

  return (
    <PortfolioSection id="work" band="muted">
      <SectionTitle
        kicker="Portfolio"
        title="Selected work"
        description="A few highlighted projects — see the full list on the projects page."
      />
      <ul className="mt-10 flex flex-col gap-4 sm:mt-12 sm:gap-5">
        {featured.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </ul>
      <div className="mt-8 flex justify-center sm:mt-10">
        <Button asChild variant="outline" size="lg">
          <Link href="/projects">View all projects →</Link>
        </Button>
      </div>
    </PortfolioSection>
  )
}
