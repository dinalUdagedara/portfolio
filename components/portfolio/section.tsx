import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

const bandClass = {
  default: "",
  muted: "bg-muted/25 dark:bg-muted/10",
} as const

export type SectionBand = keyof typeof bandClass

type PortfolioSectionProps = {
  id?: string
  band?: SectionBand
  className?: string
  children: ReactNode
}

export function PortfolioSection({
  id,
  band = "default",
  className,
  children,
}: PortfolioSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 border-t border-border/50 py-14 sm:py-20 md:py-24",
        "pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]",
        bandClass[band],
        className
      )}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

type SectionTitleProps = {
  kicker?: string
  title: string
  description?: string
  className?: string
}

export function SectionTitle({ kicker, title, description, className }: SectionTitleProps) {
  return (
    <header className={cn("max-w-2xl", className)}>
      {kicker ? (
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-primary/90">
          {kicker}
        </p>
      ) : null}
      <div className={cn("flex gap-4", kicker ? "mt-2" : "")}>
        <span
          className="mt-1.5 hidden h-7 w-0.5 shrink-0 rounded-full bg-gradient-to-b from-primary to-primary/25 sm:block"
          aria-hidden
        />
        <div className="min-w-0">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
          {description ? (
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  )
}
