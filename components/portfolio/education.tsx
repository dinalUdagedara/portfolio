import { PortfolioSection, SectionTitle } from "@/components/portfolio/section"
import { education } from "@/lib/site"

export function Education() {
  return (
    <PortfolioSection id="education" band="muted">
      <SectionTitle
        kicker="Background"
        title="Education"
        description="What I studied and where."
      />
      <ol className="relative mt-10 space-y-10 border-l border-border/70 pl-6 sm:mt-12 sm:space-y-12 sm:pl-10">
        {education.map((item, index) => (
          <li
            key={`${item.institution}-${item.period}`}
            className="relative portfolio-fade-up"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <span
              className="absolute -left-px top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-primary shadow-sm ring-1 ring-primary/25"
              aria-hidden
            />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-tight ml-3">
                  {item.degree} — {item.programme}
                  {item.honours ? `, ${item.honours}` : ""}
                </h3>
                <p className="text-sm text-muted-foreground ml-3">{item.institution}</p>
              </div>
              <p className="mt-1 shrink-0 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-muted-foreground sm:mt-0 sm:text-[11px] sm:tracking-[0.14em]">
                {item.period}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </PortfolioSection>
  )
}
