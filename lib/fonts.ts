import { Italianno } from "next/font/google"

export const fontSignature = Italianno({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-signature",
  adjustFontFallback: false,
  fallback: ["cursive"],
})
