import { experience } from "@/lib/site"

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 border-t border-border/60 px-4 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="text-lg font-medium tracking-tight">Experience</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Keep each bullet crisp: action + scope + outcome.
        </p>
        <ol className="mt-10 flex flex-col gap-10">
          {experience.map((item) => (
            <li key={`${item.company}-${item.period}`} className="relative">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="min-w-0">
                  <h3 className="text-base font-medium tracking-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.company}</p>
                </div>
                <p className="shrink-0 text-sm text-muted-foreground">{item.period}</p>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                {item.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
