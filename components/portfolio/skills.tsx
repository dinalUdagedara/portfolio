import { PortfolioSection, SectionTitle } from "@/components/portfolio/section"
import { skills } from "@/lib/site"

export function Skills() {
  return (
    <PortfolioSection id="skills" band="default">
      <SectionTitle
        kicker="Toolbox"
        title="Skills"
        description="Languages, frameworks, and infrastructure I work with day to day."
      />
      <div className="mt-10 sm:mt-12">
        {skills.map((group, index) => (
          <div
            key={group.category}
            className="portfolio-fade-up flex flex-col gap-2.5 border-t border-border/40 py-5 first:border-t-0 first:pt-0 sm:flex-row sm:items-baseline sm:gap-6"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <h3 className="shrink-0 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-primary/90 sm:w-40">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border/80 bg-background/80 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PortfolioSection>
  )
}
