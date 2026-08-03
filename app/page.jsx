import HomePageView from "@/components/home/HomePageView";
import { buildMetadata } from "@/lib/seo";
import { siteSeo } from "@/data/site";
import { getServices } from "@/lib/api/services";
import { getPosts } from "@/lib/api/blog";
import {
  getAboutPage,
  getHomeSections,
  getGalleryItems,
  getTestimonials,
} from "@/lib/api";

export const metadata = buildMetadata({
  ...siteSeo,
  path: "/",
});

export default async function HomePage() {
  const [about, sections, services, gallery, testimonials, posts] =
    await Promise.all([
      getAboutPage(),
      getHomeSections(),
      getServices(),
      getGalleryItems(),
      getTestimonials(),
      getPosts(),
    ]);

  return (
    <HomePageView
      about={about}
      sections={sections}
      services={services}
      gallery={gallery}
      testimonials={testimonials}
      posts={posts}
    />
  );
}
