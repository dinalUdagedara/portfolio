import { PortfolioSection, SectionTitle } from "@/components/portfolio/section"
import { experience } from "@/lib/site"

export function Experience() {
  return (
    <PortfolioSection id="experience" band="default">
      <SectionTitle
        kicker="History"
        title="Experience"
        description="Keep each bullet crisp: action + scope + outcome."
      />
      <ol className="relative mt-12 space-y-12 border-l border-border/70 pl-8 sm:pl-10">
        {experience.map((item, index) => (
          <li
            key={`${item.company}-${item.period}`}
            className="relative portfolio-fade-up"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <span
              className="absolute -left-px top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-primary shadow-sm ring-1 ring-primary/25"
              aria-hidden
            />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.company}</p>
              </div>
              <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {item.period}
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {item.highlights.map((h) => (
                <li key={h} className="relative pl-4 before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-primary/45">
                  {h}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </PortfolioSection>
  )
}
