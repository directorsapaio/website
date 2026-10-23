import type { MetadataRoute } from "next";
import { industries } from "@/config/industries";
import { publicServicePages } from "@/config/services";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/industries", "/our-approach", "/quality-safety-sustainability", "/careers", "/insights", "/contact", "/privacy", "/terms"];
  return [
    ...routes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "monthly" as const : "yearly" as const, priority: route === "" ? 1 : .7 })),
    ...publicServicePages.map(({ slug }) => ({ url: `${siteConfig.url}/services/${slug}`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: .75 })),
    ...industries.map(({ slug }) => ({ url: `${siteConfig.url}/industries/${slug}`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: .65 })),
  ];
}
