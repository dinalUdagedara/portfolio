import { site } from "@/lib/site"

type JsonLdProps = {
  siteOrigin: string
}

function isCompleteProfileUrl(url: string) {
  try {
    const u = new URL(url)
    if (u.hostname === "github.com") {
      return u.pathname.length > 1 && u.pathname !== "/"
    }
    if (u.hostname.endsWith("linkedin.com") || u.hostname.endsWith("www.linkedin.com")) {
      return /\/in\/[^/]+\/?$/.test(u.pathname)
    }
    return u.pathname.length > 1
  } catch {
    return false
  }
}

export function PersonJsonLd({ siteOrigin }: JsonLdProps) {
  const sameAs = [site.links.github, site.links.linkedin].filter(isCompleteProfileUrl)

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: siteOrigin,
    jobTitle: site.role,
    description: site.tagline,
    image: `${siteOrigin}${site.portraitImage}`,
    sameAs: sameAs.length ? sameAs : undefined,
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
