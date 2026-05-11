import Link from "next/link"

import { projects } from "@/lib/site"

export function Projects() {
  return (
    <section id="work" className="scroll-mt-20 border-t border-border/60 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-lg font-medium tracking-tight">Selected work</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Replace the placeholders in <span className="font-mono text-xs">lib/site.ts</span> with
          your real projects, links, and tags.
        </p>
        <ul className="mt-10 flex flex-col gap-4">
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
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
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
      </div>
    </section>
  )
}
