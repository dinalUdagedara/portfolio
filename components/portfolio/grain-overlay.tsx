/** Fixed film-grain texture; pointer-events none. Keep opacity very low. */
export function GrainOverlay() {
  const noise =
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 opacity-[0.02] mix-blend-overlay dark:opacity-[0.04]"
      style={{ backgroundImage: noise }}
    />
  )
}
