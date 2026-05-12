export type FaviconPreset = "d" | "du" | "code" | "stack"

const PRESETS: readonly FaviconPreset[] = ["d", "du", "code", "stack"] as const

export function getFaviconPreset(): FaviconPreset {
  const raw = (process.env.NEXT_PUBLIC_FAVICON_PRESET ?? "code").toLowerCase().trim()
  return (PRESETS as readonly string[]).includes(raw) ? (raw as FaviconPreset) : "code"
}
