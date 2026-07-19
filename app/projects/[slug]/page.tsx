import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/portfolio/site-footer"
import { SiteHeader } from "@/components/portfolio/site-header"
import { projects } from "@/lib/site"
import { cn } from "@/lib/utils"

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

  const screenshots = project.screenshots ?? []
  const [hero, ...rest] = screenshots

  return (
    <div className="min-h-svh min-w-0 overflow-x-clip pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-6xl px-[max(1rem,env(safe-area-inset-left))] py-10 sm:py-14">

          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            All projects
          </Link>

          {/* Info section */}
          <div className="mt-8 max-w-3xl">
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

            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
              {project.longDescription}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
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

          {/* Screenshot gallery */}
          {screenshots.length > 0 && (
            <div className="mt-12 space-y-4 sm:mt-16">

              {/* Hero screenshot — full width */}
              <div className="portfolio-fade-up overflow-hidden rounded-2xl border border-border bg-muted/40 shadow-md">
                <div className="relative aspect-video w-full">
                  <Image
                    src={hero}
                    alt={`${project.title} — screenshot 1`}
                    fill
                    priority
                    sizes="(max-width: 1280px) 100vw, 1152px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Remaining screenshots — responsive grid */}
              {rest.length > 0 && (
                <div className={cn(
                  "grid gap-4",
                  rest.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
                )}>
                  {rest.map((src, i) => (
                    <div
                      key={src}
                      className="portfolio-fade-up overflow-hidden rounded-2xl border border-border bg-muted/40 shadow-sm"
                      style={{ animationDelay: `${(i + 1) * 80}ms` }}
                    >
                      <div className="relative aspect-video w-full">
                        <Image
                          src={src}
                          alt={`${project.title} — screenshot ${i + 2}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 576px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
