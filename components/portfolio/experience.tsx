import { PortfolioSection, SectionTitle } from "@/components/portfolio/section"
import { experience } from "@/lib/site"

export function Experience() {
  return (
    <PortfolioSection id="experience">
      <SectionTitle
        kicker="History"
        title="Experience"
        description="Keep each bullet crisp: action + scope + outcome."
      />
      <ol className="mt-12 flex flex-col gap-10">
        {experience.map((item) => (
          <li key={`${item.company}-${item.period}`} className="relative">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div className="min-w-0">
                <h3 className="text-base font-medium tracking-tight">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.company}</p>
              </div>
              <p className="shrink-0 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                {item.period}
              </p>
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              {item.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </PortfolioSection>
  )
}
