import { site } from "@/lib/site"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-primary/20 bg-muted/20 py-10 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] dark:bg-muted/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-pretty text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-2">
        <p>
          © {year} {site.name}
        </p>
        <p className="font-mono text-xs">Next.js · TypeScript · Tailwind · shadcn</p>
      </div>
    </footer>
  )
}
