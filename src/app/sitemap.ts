import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.postvideonow.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-04-06"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-04-06"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2026-04-06"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
