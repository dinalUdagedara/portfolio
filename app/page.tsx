import Link from "next/link"

import { Contact } from "@/components/portfolio/contact"
import { Experience } from "@/components/portfolio/experience"
import { Projects } from "@/components/portfolio/projects"
import { SiteFooter } from "@/components/portfolio/site-footer"
import { SiteHeader } from "@/components/portfolio/site-header"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

export default function Page() {
  return (
    <div className="min-h-svh">
      <SiteHeader />
      <main>
        <section id="top" className="scroll-mt-20 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-muted-foreground">{site.role}</p>
            <h1 className="mt-2 text-balance text-3xl font-medium tracking-tight sm:text-4xl">
              {site.name}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {site.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="#work">View work</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={`mailto:${site.email}`}>Email me</Link>
              </Button>
            </div>
          </div>
        </section>
        <Projects />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
      <p className="sr-only">
        Press the letter d to toggle dark mode.
      </p>
    </div>
  )
}
