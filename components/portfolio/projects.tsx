import Link from "next/link"

import { PortfolioSection, SectionTitle } from "@/components/portfolio/section"
import { projects } from "@/lib/site"

function initials(title: string) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2)
}

export function Projects() {
  return (
    <PortfolioSection id="work" band="muted">
      <SectionTitle
        kicker="Portfolio"
        title="Selected work"
        description="Replace the placeholders in lib/site.ts with your real projects, links, and tags."
      />
      <ul className="mt-12 flex flex-col gap-5">
        {projects.map((project, index) => (
          <li
            key={project.title}
            className="portfolio-fade-up"
            style={{ animationDelay: `${index * 85}ms` }}
          >
            <Link
              href={project.href}
              className="group grid gap-0 overflow-hidden rounded-2xl border border-border bg-card transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none sm:grid-cols-12"
            >
              <div className="relative flex aspect-[16/10] min-h-[9rem] items-center justify-center bg-gradient-to-br from-primary/15 via-muted/50 to-muted sm:col-span-4 sm:aspect-auto sm:min-h-[12rem]">
                <span className="select-none text-3xl font-semibold tracking-tight text-foreground/20 transition-colors group-hover:text-foreground/35 sm:text-4xl">
                  {initials(project.title)}
                </span>
              </div>
              <div className="flex flex-col justify-center border-t border-border/60 p-5 sm:col-span-8 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                <h3 className="text-base font-semibold tracking-tight transition-colors group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/80 bg-background/80 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </PortfolioSection>
  )
}
