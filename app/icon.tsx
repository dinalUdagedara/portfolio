import { ImageResponse } from "next/og"

import { FaviconMark } from "@/components/favicon/favicon-mark"
import { getFaviconPreset } from "@/lib/favicon-preset"

export const runtime = "nodejs"
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(<FaviconMark preset={getFaviconPreset()} size="sm" />, { ...size })
}
