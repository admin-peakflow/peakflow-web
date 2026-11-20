import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { CASES } from "@/lib/cases";

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
  ];
}
