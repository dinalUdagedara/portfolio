import { ImageResponse } from "next/og"

import { FaviconMark } from "@/components/favicon/favicon-mark"
import { getFaviconPreset } from "@/lib/favicon-preset"

export const runtime = "nodejs"
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(<FaviconMark preset={getFaviconPreset()} size="lg" />, { ...size })
}
