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
      <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, index) => (
          <div
            key={group.category}
            className="portfolio-fade-up rounded-2xl border border-border/70 bg-card/60 p-5"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-primary/90">
              {group.category}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
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
