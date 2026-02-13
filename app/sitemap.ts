// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://signal-bank2-trade.vercel.app";
  const now = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },

    // ✅ Agar tum in pages ko create kar rahe ho to uncomment:
    // { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    // { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    // { url: `${baseUrl}/imprint`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    // { url: `${baseUrl}/legal-notice`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
