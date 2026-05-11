import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Hero() {
  const portraitAlt = `${site.name} — portrait`

  return (
    <section
      id="top"
      className={cn(
        "relative scroll-mt-20 overflow-hidden",
        "border-b border-border/40",
        "bg-gradient-to-b from-muted/30 via-background to-background",
        "dark:from-muted/15 dark:via-background dark:to-background"
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.75_0.12_75/0.22),transparent)] dark:bg-[radial-gradient(ellipse_70%_45%_at_20%_0%,oklch(0.55_0.14_55/0.18),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl dark:bg-amber-400/15"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[2.25rem] bg-gradient-to-br from-amber-400/25 via-orange-300/10 to-transparent opacity-90 blur-2xl dark:from-amber-400/20 dark:via-orange-500/10 dark:to-transparent"
              />
              <div
                aria-hidden
                className="absolute inset-[10%] -z-10 rounded-[2rem] bg-gradient-to-t from-background via-transparent to-transparent dark:from-background"
              />
              <figure className="relative">
                <div
                  className={cn(
                    "relative aspect-[3/4] overflow-hidden rounded-[2rem]",
                    "shadow-[0_24px_80px_-12px_rgba(0,0,0,0.35)]",
                    "ring-1 ring-black/5 dark:shadow-[0_28px_90px_-16px_rgba(0,0,0,0.65)] dark:ring-white/10"
                  )}
                >
                  <Image
                    src={site.portraitImage}
                    alt={portraitAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 38vw, 85vw"
                    className="object-cover object-[center_18%] saturate-[1.02]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/25 via-transparent to-transparent dark:from-background/40"
                  />
                </div>
              </figure>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              {site.role}
            </p>
            <h1 className="mt-3 text-balance text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.08]">
              {site.name}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {site.tagline}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="#work">View work</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={`mailto:${site.email}`}>Email me</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
