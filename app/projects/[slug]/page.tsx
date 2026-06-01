import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/portfolio/site-footer"
import { SiteHeader } from "@/components/portfolio/site-header"
import { site, projects } from "@/lib/site"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const hasScreenshots = project.screenshots && project.screenshots.length > 0

  return (
    <div className="min-h-svh min-w-0 overflow-x-clip pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-6xl px-[max(1rem,env(safe-area-inset-left))] py-10 sm:py-14">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            All projects
          </Link>

          <div className={`mt-8 grid gap-10 ${hasScreenshots ? "lg:grid-cols-2 lg:gap-14" : ""}`}>
            {/* Left column — project info */}
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/80 bg-muted/50 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {project.title}
              </h1>

              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
                {project.longDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <Button asChild size="default">
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink size={15} className="mr-1.5" />
                      Live demo
                    </a>
                  </Button>
                )}
                {project.githubLinks?.map((link) => (
                  <Button key={link.href} asChild variant="outline" size="default">
                    <a href={link.href} target="_blank" rel="noreferrer">
                      <GitBranch size={15} className="mr-1.5" />
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Right column — screenshot gallery */}
            {hasScreenshots && (
              <div className="flex flex-col gap-4">
                {project.screenshots!.map((src, i) => (
                  <div
                    key={src}
                    className="portfolio-fade-up relative overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-sm"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="relative aspect-video w-full">
                      <Image
                        src={src}
                        alt={`${project.title} screenshot ${i + 1}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
