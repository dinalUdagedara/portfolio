import Image from "next/image"
import Link from "next/link"

import { type Project } from "@/lib/site"

function initials(title: string) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2)
}

type ProjectCardProps = {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <li
      className="portfolio-fade-up"
      style={{ animationDelay: `${index * 85}ms` }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group grid min-h-[3rem] touch-manipulation gap-0 overflow-hidden rounded-2xl border border-border bg-card transition-[transform,box-shadow] duration-300 ease-out active:scale-[0.99] hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none sm:grid-cols-12 sm:active:scale-100"
      >
        <div className="relative flex aspect-[16/10] min-h-[8.5rem] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/15 via-muted/50 to-muted sm:col-span-4 sm:aspect-auto sm:min-h-[12rem]">
          {project.screenshots && project.screenshots.length > 0 ? (
            <Image
              src={project.screenshots[0]}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <span className="select-none text-3xl font-semibold tracking-tight text-foreground/20 transition-colors group-hover:text-foreground/35 sm:text-4xl">
              {initials(project.title)}
            </span>
          )}
        </div>
        <div className="flex min-w-0 flex-col justify-center border-t border-border/60 p-4 sm:col-span-8 sm:border-l sm:border-t-0 sm:p-5 sm:px-8 sm:py-6">
          <h3 className="text-base font-semibold tracking-tight transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mt-2 break-words text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
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
  )
}
