import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/terms", "/privacy"],
        disallow: ["/dashboard", "/api/", "/sign-in", "/sign-up"],
      },
    ],
    sitemap: "https://www.postvideonow.com/sitemap.xml",
    host: "https://www.postvideonow.com",
  };
}
