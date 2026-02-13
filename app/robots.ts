// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://signal-bank2-trade.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Agar tum kisi folder ko block karna chaho:
        // disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
