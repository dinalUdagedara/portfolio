import { Contact } from "@/components/portfolio/contact"
import { Experience } from "@/components/portfolio/experience"
import { Hero } from "@/components/portfolio/hero"
import { Projects } from "@/components/portfolio/projects"
import { SiteFooter } from "@/components/portfolio/site-footer"
import { SiteHeader } from "@/components/portfolio/site-header"

export default function Page() {
  return (
    <div className="min-h-svh min-w-0 overflow-x-clip pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <SiteHeader />
      <main>
        <Hero />
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
