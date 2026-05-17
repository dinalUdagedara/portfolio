import Link from "next/link"

import { PortfolioSection, SectionTitle } from "@/components/portfolio/section"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

export function Contact() {
  return (
    <PortfolioSection id="contact" band="muted">
      <SectionTitle
        kicker="Hello"
        title="Get in touch"
        description={`Feel free to reach out via email at ${site.email} or connect on any of the links below.`}
      />
      <div className="mt-10 flex w-full max-w-md touch-manipulation flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
        <Button asChild size="lg" className="h-11 w-full min-h-11 sm:h-10 sm:w-auto sm:min-h-10">
          <Link href={`mailto:${site.email}`}>Email me</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-11 w-full min-h-11 sm:h-10 sm:w-auto sm:min-h-10">
          <Link href={site.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-11 w-full min-h-11 sm:h-10 sm:w-auto sm:min-h-10">
          <Link href={site.links.instagram} target="_blank" rel="noreferrer">
            Instagram
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-11 w-full min-h-11 sm:h-10 sm:w-auto sm:min-h-10">
          <Link href={site.links.github} target="_blank" rel="noreferrer">
            GitHub
          </Link>
        </Button>
      </div>
    </PortfolioSection>
  )
}
