import type { MetadataRoute } from "next"

import { site } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  const first = site.name.split(" ")[0] ?? site.name

  return {
    name: `${site.name} — Portfolio`,
    short_name: first,
    description: site.tagline,
    start_url: "/",
    display: "browser",
    orientation: "portrait-primary",
    background_color: "#fafafa",
    theme_color: "#171412",
    categories: ["portfolio", "developer"],
    lang: "en",
  }
}
