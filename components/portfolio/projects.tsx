import Link from "next/link"

import { PortfolioSection, SectionTitle } from "@/components/portfolio/section"
import { projects } from "@/lib/site"

export function Projects() {
  return (
    <PortfolioSection id="work">
      <SectionTitle
        kicker="Portfolio"
        title="Selected work"
        description="Replace the placeholders in lib/site.ts with your real projects, links, and tags."
      />
      <ul className="mt-12 flex flex-col gap-4">
        {projects.map((project) => (
          <li key={project.title}>
            <Link
              href={project.href}
              className="group block rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-muted/40"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <h3 className="truncate text-base font-medium tracking-tight group-hover:underline">
                      {project.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </PortfolioSection>
  )
}
