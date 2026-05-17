import type { Metadata, Viewport } from "next"
import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { GrainOverlay } from "@/components/portfolio/grain-overlay"
import { PersonJsonLd } from "@/components/seo/json-ld"
import { ThemeProvider } from "@/components/theme-provider"
import { fontSignature } from "@/lib/fonts"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
const siteOrigin = siteUrl.replace(/\/$/, "")
const twitterHandle = site.twitterHandle?.replace(/^@/, "").trim()
const ogTitle = `${site.name} — Portfolio`
const ogDescription = [site.hook, site.tagline].filter(Boolean).join(" · ")

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#141820" },
  ],
  colorScheme: "dark light",
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: ogTitle,
  title: {
    default: ogTitle,
    template: `%s — ${site.name}`,
  },
  description: ogDescription,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: siteOrigin }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  classification: "Portfolio",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  referrer: "strict-origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: ogTitle,
    description: ogDescription,
    images: [
      {
        url: site.portraitImage,
        width: 1200,
        height: 1600,
        alt: `${site.name} — portrait`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: [site.portraitImage],
    ...(twitterHandle ? { creator: `@${twitterHandle}` } : {}),
  },
  appleWebApp: {
    capable: true,
    title: site.name.split(" ")[0] ?? site.name,
    statusBarStyle: "default",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        "font-sans",
        inter.variable,
        fontMono.variable,
        fontSignature.variable
      )}
    >
      <body className="min-w-0 overflow-x-clip">
        <PersonJsonLd siteOrigin={siteOrigin} />
        <ThemeProvider>
          <GrainOverlay />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
