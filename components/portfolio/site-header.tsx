import Link from "next/link"

import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const nav = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
        <Link
          href="#top"
          className="group min-w-0 truncate text-sm font-medium tracking-tight text-foreground transition-colors hover:text-primary"
        >
          {site.name.split(" ")[0]}
          <span className="text-muted-foreground transition-colors group-hover:text-primary/75">.dev</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative rounded-full px-3 py-1.5 text-muted-foreground transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 hover:bg-muted/60 hover:text-foreground hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
