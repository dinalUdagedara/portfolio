import Link from "next/link"

import { PortfolioSection, SectionTitle } from "@/components/portfolio/section"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

export function Contact() {
  return (
    <PortfolioSection id="contact" band="muted">
      <SectionTitle
        kicker="Hello"
        title="Contact"
        description="Swap in your real email and social links in lib/site.ts."
      />
      <div className="mt-10 flex w-full max-w-md touch-manipulation flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
        <Button asChild size="lg" className="h-11 w-full min-h-11 sm:h-10 sm:w-auto sm:min-h-10">
          <Link href={`mailto:${site.email}`}>Email</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-11 w-full min-h-11 sm:h-10 sm:w-auto sm:min-h-10">
          <Link href={site.links.github} target="_blank" rel="noreferrer">
            GitHub
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-11 w-full min-h-11 sm:h-10 sm:w-auto sm:min-h-10">
          <Link href={site.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </Link>
        </Button>
      </div>
    </PortfolioSection>
  )
}
