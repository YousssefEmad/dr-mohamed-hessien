"use client";

import HomeBanner from "@/components/home/HomeBanner";
import HomeAbout from "@/components/home/HomeAbout";
import HomeServices from "@/components/home/HomeServices";
import HomeCases from "@/components/home/HomeCases";
import HomeReviews from "@/components/home/HomeReviews";
import HomeBlog from "@/components/home/HomeBlog";

export default function HomePageView({
  about,
  sections,
  services,
  gallery,
  testimonials,
  posts,
}) {
  return (
    <>
      <HomeBanner />
      <HomeAbout about={about} sections={sections} />
      <HomeServices services={services} sections={sections} />
      <HomeCases items={gallery} sections={sections} />
      <HomeReviews reviews={testimonials} sections={sections} />
      <HomeBlog posts={posts} sections={sections} />
    </>
  );
}
