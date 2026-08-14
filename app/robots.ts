import type { MetadataRoute } from "next";

const siteUrl = "https://fabio-otica-altiplano.marianowictor.chatgpt.site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
