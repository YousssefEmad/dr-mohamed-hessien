import { services as localServices } from "@/data/services";

/** Replace body with Sanity fetch later — keep this signature. */
export async function getServices() {
  return [...localServices].sort((a, b) => a.order - b.order);
}

export async function getServiceBySlug(slug) {
  const list = await getServices();
  const decoded = decodeURIComponent(slug || "");
  return list.find((s) => s.slug === slug || s.slug === decoded) || null;
}

export async function getRelatedServices(slugs = []) {
  const list = await getServices();
  return list.filter((s) => slugs.includes(s.slug));
}

export async function getServiceSlugs() {
  const list = await getServices();
  return list.map((s) => s.slug);
}
