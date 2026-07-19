"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { fontSignature } from "@/lib/fonts"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const nav = [
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#github", label: "GitHub" },
  ...(site.mediumUsername ? [{ href: "#writing", label: "Writing" }] : []),
  { href: "#contact", label: "Contact" },
]

const firstName = site.name.split(" ")[0] ?? site.name

export function SiteHeader({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open])

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

        <nav className="hidden min-w-0 flex-1 justify-end gap-0.5 sm:flex sm:flex-none sm:gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 hover:bg-muted/60 hover:text-foreground hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 shrink-0 touch-manipulation items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted/60 sm:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-14 z-40 bg-background/60 backdrop-blur-sm sm:hidden"
        />
      ) : null}

      <nav
        id="mobile-nav"
        className={cn(
          "absolute inset-x-0 top-full z-50 origin-top border-b border-border/60 bg-background/95 backdrop-blur-md transition-[opacity,transform] duration-150 ease-out sm:hidden",
          open
            ? "pointer-events-auto scale-y-100 opacity-100"
            : "pointer-events-none scale-y-95 opacity-0"
        )}
      >
        <ul className="flex flex-col gap-0.5 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block touch-manipulation rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/60"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
