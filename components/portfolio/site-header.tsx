import Link from "next/link"

import { fontSignature } from "@/lib/fonts"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const nav = [
  { href: "#work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#github", label: "GitHub" },
  ...(site.mediumUsername ? [{ href: "#writing", label: "Writing" }] : []),
  { href: "#contact", label: "Contact" },
]

const firstName = site.name.split(" ")[0] ?? site.name

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md",
        className
      )}
    >
      <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-between gap-2 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:gap-3">
        <Link
          href="/"
          aria-label={site.name}
          className={cn(
            fontSignature.className,
            "group shrink-0 text-[1.65rem] font-normal leading-none",
            "text-foreground transition-colors hover:text-primary sm:text-[1.85rem]"
          )}
          style={fontSignature.style}
        >
          <span className="sm:hidden">{firstName}</span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>
        <nav className="flex min-w-0 flex-1 justify-end gap-0.5 overflow-x-auto overscroll-x-contain py-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-none sm:gap-1 sm:overflow-visible sm:py-0 [&::-webkit-scrollbar]:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative shrink-0 whitespace-nowrap rounded-full px-2 py-2 text-xs text-muted-foreground transition-colors after:absolute after:inset-x-2 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 hover:bg-muted/60 hover:text-foreground hover:after:scale-x-100 sm:px-3 sm:py-1.5 sm:text-sm sm:after:inset-x-3"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
