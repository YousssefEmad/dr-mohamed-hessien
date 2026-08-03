import { siteConfig } from "@/data/site";
import { getServiceSlugs } from "@/lib/api/services";
import { getPostSlugs } from "@/lib/api/blog";

export const dynamic = "force-static";

export default async function sitemap() {
  const base = siteConfig.url;
  const staticPaths = [
    "",
    "about",
    "services",
    "blog",
    "contact",
    "gallery",
    "videos",
    "testimonials",
    "doctors",
    "privacy-policy",
    "terms",
  ];

  const [serviceSlugs, postSlugs] = await Promise.all([
    getServiceSlugs(),
    getPostSlugs(),
  ]);

  const now = new Date().toISOString();

  return [
    ...staticPaths.map((path) => ({
      url: path ? `${base}/${path}/` : `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.8,
    })),
    ...serviceSlugs.map((slug) => ({
      url: `${base}/services/${slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    ...postSlugs.map((slug) => ({
      url: `${base}/blog/${slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];
}
