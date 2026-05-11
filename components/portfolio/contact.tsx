import Link from "next/link"

import { PortfolioSection, SectionTitle } from "@/components/portfolio/section"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

export function Contact() {
  return (
    <PortfolioSection id="contact">
      <SectionTitle
        kicker="Hello"
        title="Contact"
        description="Swap in your real email and social links in lib/site.ts."
      />
      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href={`mailto:${site.email}`}>Email</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href={site.links.github} target="_blank" rel="noreferrer">
            GitHub
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href={site.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </Link>
        </Button>
      </div>
    </PortfolioSection>
  )
}
