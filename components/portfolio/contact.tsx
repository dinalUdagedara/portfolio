import Link from "next/link"

import { site } from "@/lib/site"
import { Button } from "@/components/ui/button"

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-border/60 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-lg font-medium tracking-tight">Contact</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Swap in your real email and social links in <span className="font-mono text-xs">lib/site.ts</span>
          .
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
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
      </div>
    </section>
  )
}
