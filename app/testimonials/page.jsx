import TestimonialsPageView from "@/components/shared/TestimonialsPageView";
import { buildMetadata } from "@/lib/seo";
import { getTestimonials, getTestimonialsPage } from "@/lib/api";

import { REVALIDATE_SECONDS } from "@/lib/sanity/revalidate";

export const revalidate = REVALIDATE_SECONDS;

export async function generateMetadata() {
  const page = await getTestimonialsPage();
  return buildMetadata({ ...page.seo, path: "/testimonials/" });
}

export default async function TestimonialsPage() {
  const [items, page] = await Promise.all([
    getTestimonials(),
    getTestimonialsPage(),
  ]);
  return <TestimonialsPageView items={items} page={page} />;
}
