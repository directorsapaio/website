import type { MetadataRoute } from "next";
import { assets } from "@/config/assets";
import { industries } from "@/config/industries";
import { publicServicePages } from "@/config/services";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/industries", "/our-approach", "/quality-safety-sustainability", "/careers", "/insights", "/contact", "/privacy", "/terms"];
  const routeImages: Record<string, string> = {
    "": assets.home.hero,
    "/about": assets.home.about,
    "/services": assets.home.operations,
    "/industries": assets.transport[0],
    "/our-approach": assets.home.operations,
    "/quality-safety-sustainability": assets.workforce.detail,
    "/careers": assets.workforce.support,
  };
  const absolute = (path: string) => new URL(path, siteConfig.url).toString();
  const lastModified = new Date();

  return [
    ...routes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified, changeFrequency: route === "" ? "monthly" as const : "yearly" as const, priority: route === "" ? 1 : .7, ...(routeImages[route] ? { images: [absolute(routeImages[route])] } : {}) })),
    ...publicServicePages.map(({ slug, image }) => ({ url: `${siteConfig.url}/services/${slug}`, lastModified, changeFrequency: "yearly" as const, priority: .75, images: [absolute(image)] })),
    ...industries.map(({ slug, image }) => ({ url: `${siteConfig.url}/industries/${slug}`, lastModified, changeFrequency: "yearly" as const, priority: .65, images: [absolute(image)] })),
  ];
}
