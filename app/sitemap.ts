import type { MetadataRoute } from "next";

const siteUrl = "https://fabio-otica-altiplano.marianowictor.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
