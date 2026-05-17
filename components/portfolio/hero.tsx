import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { fontSignature } from "@/lib/fonts"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Hero() {
  const portraitAlt = `${site.name} — portrait`

  return (
    <section
      id="top"
      className={cn(
        "relative scroll-mt-20 overflow-x-clip",
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
        className="pointer-events-none absolute -right-16 top-1/4 h-56 w-56 rounded-full bg-primary/5 blur-3xl sm:-right-24 sm:h-72 sm:w-72 dark:bg-primary/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl sm:-left-32 sm:h-80 sm:w-80 dark:bg-amber-400/15"
      />

      <div
        className="relative mx-auto max-w-6xl py-12 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:py-16 lg:py-24"
      >
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[min(100%,20rem)] sm:max-w-sm lg:mx-0 lg:max-w-none">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-400/25 via-orange-300/10 to-transparent opacity-90 blur-2xl sm:-inset-6 sm:rounded-[2.25rem] dark:from-amber-400/20 dark:via-orange-500/10 dark:to-transparent"
              />
              <div
                aria-hidden
                className="absolute inset-[10%] -z-10 rounded-[2rem] bg-gradient-to-t from-background via-transparent to-transparent dark:from-background"
              />
              <figure className="relative mx-auto max-w-sm lg:mx-0 lg:max-w-none">
                <div
                  className={cn(
                    "relative aspect-[3/4] max-h-[min(68vh,26rem)] w-full overflow-hidden rounded-2xl sm:max-h-none sm:rounded-[2rem]",
                    "shadow-[0_24px_80px_-12px_rgba(0,0,0,0.35)]",
                    "ring-1 ring-black/5 dark:shadow-[0_28px_90px_-16px_rgba(0,0,0,0.65)] dark:ring-white/10"
                  )}
                >
                  <Image
                    src={site.portraitImage}
                    alt={portraitAlt}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 38vw"
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

          <div className="order-1 min-w-0 lg:order-2 lg:col-span-7">
            <p className="font-mono text-[10px] font-medium uppercase leading-relaxed tracking-[0.18em] text-primary/90 sm:text-[11px] sm:tracking-[0.22em]">
              {site.role}
            </p>
            <h1
              className={cn(
                fontSignature.className,
                "mt-3 max-w-xl text-[3rem] font-normal leading-[1.05]",
                "text-foreground sm:mt-4 sm:text-[3.5rem] lg:text-[4rem]"
              )}
              style={fontSignature.style}
            >
              {site.name}
            </h1>
            <p className="mt-3 max-w-xl text-pretty font-sans text-base font-medium leading-snug tracking-tight text-foreground sm:mt-4 sm:text-lg">
              {site.hook}
            </p>
            <p className="mt-2 max-w-xl text-pretty font-sans text-sm leading-relaxed text-foreground/75 sm:text-base">
              {site.bio}
            </p>
            <div className="mt-8 flex w-full max-w-xl touch-manipulation flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="h-11 w-full min-h-11 sm:h-10 sm:w-auto sm:min-h-10">
                <Link href="#work">View work</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 w-full min-h-11 sm:h-10 sm:w-auto sm:min-h-10">
                <Link href="#contact">Get in touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
