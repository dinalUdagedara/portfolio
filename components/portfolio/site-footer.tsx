import { site } from "@/lib/site"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/60 px-4 py-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}
        </p>
        <p className="font-mono text-xs">Next.js · TypeScript · Tailwind · shadcn</p>
      </div>
    </footer>
  )
}
