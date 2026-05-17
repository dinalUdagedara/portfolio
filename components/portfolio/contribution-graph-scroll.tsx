"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

type ContributionGraphScrollProps = {
  children: React.ReactNode
  className?: string
}

/** Scroll heatmap to the most recent week (matches github.com default view). */
export function ContributionGraphScroll({
  children,
  className,
}: ContributionGraphScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const raf = requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-x-auto pb-1 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      {children}
    </div>
  )
}
