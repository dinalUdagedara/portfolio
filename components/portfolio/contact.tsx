import Link from "next/link"

import { ContactForm } from "@/components/portfolio/contact-form"
import { PortfolioSection, SectionTitle } from "@/components/portfolio/section"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

const socialLinks = [
  { href: `mailto:${site.email}`, label: "Email" },
  { href: site.links.linkedin, label: "LinkedIn" },
  { href: site.links.github, label: "GitHub" },
  { href: site.links.instagram, label: "Instagram" },
] as const

export function Contact() {
  return (
    <PortfolioSection id="contact" band="muted">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="lg:col-span-5">
          <SectionTitle
            kicker="Hello"
            title="Get in touch"
            description={site.contactIntro}
          />
          <div className="mt-8 flex w-full touch-manipulation flex-col gap-3 sm:flex-row sm:flex-wrap">
            {socialLinks.map((link) => (
              <Button
                key={link.label}
                asChild
                size="lg"
                variant={link.label === "Email" ? "default" : "outline"}
                className="h-11 w-full min-h-11 sm:h-10 sm:w-auto sm:min-h-10"
              >
                <Link
                  href={link.href}
                  {...(link.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noreferrer" })}
                >
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="portfolio-fade-up lg:col-span-7" style={{ animationDelay: "90ms" }}>
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 lg:p-8">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-primary/90">
              Message
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Send a note — I usually reply within a day or two.
            </p>
            <ContactForm className="mt-6" />
          </div>
        </div>
      </div>
    </PortfolioSection>
  )
}
