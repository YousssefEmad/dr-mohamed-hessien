import { notFound } from "next/navigation";
import BlogDetailView from "@/components/blog/BlogDetailView";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildMetadata,
  breadcrumbSchema,
  articleSchema,
} from "@/lib/seo";
import {
  getPostBySlug,
  getRelatedPosts,
  getAdjacentPosts,
  getPostSlugs,
  getPosts,
} from "@/lib/api/blog";
import { blogPath } from "@/lib/helpers";
import { REVALIDATE_SECONDS } from "@/lib/sanity/revalidate";

export const revalidate = REVALIDATE_SECONDS;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return buildMetadata({
    ...post.seo,
    path: blogPath(post.slug),
    image: post.image,
  });
}

export default async function BlogDetailPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const [related, adjacent, latest] = await Promise.all([
    getRelatedPosts(post.relatedSlugs || []),
    getAdjacentPosts(post.slug),
    getPosts(),
  ]);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog/" },
            { name: post.titleEn, path: blogPath(post.slug) },
          ]),
          articleSchema(post),
        ]}
      />
      <BlogDetailView
        post={post}
        related={related}
        prev={adjacent.prev}
        next={adjacent.next}
        latest={latest}
      />
    </>
  );
}
