import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { CASES } from "@/lib/cases";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, priority: 1 },
    { url: `${site.url}/sluzby/`, priority: 0.8 },
    { url: `${site.url}/reference/`, priority: 0.8 },
    { url: `${site.url}/o-nas/`, priority: 0.6 },
    { url: `${site.url}/weby/`, priority: 0.7 },
    ...CASES.map((c) => ({ url: `${site.url}/weby/${c.slug}/`, priority: 0.6 })),
    { url: `${site.url}/kontakt/`, priority: 0.8 },
    { url: `${site.url}/katalog/`, priority: 0.7 },
    { url: `${site.url}/blog/`, priority: 0.7 },
    ...getAllPosts().map((p) => ({
      url: `${site.url}/blog/${p.slug}/`,
      lastModified: p.date,
      priority: 0.6,
    })),
  ];
}
