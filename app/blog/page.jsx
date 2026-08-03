import BlogListView from "@/components/blog/BlogListView";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getPosts } from "@/lib/api/blog";

export const metadata = buildMetadata({
  titleAr: "المدونة الطبية | عيادات الدكتور محمد حسين",
  titleEn: "Medical Blog | Dr. Mohamed Hessien Clinics",
  descriptionAr: "مقالات ونصائح طبية حول أمراض العيون وجراحات الشبكية وتصحيح الإبصار.",
  descriptionEn: "Medical articles and tips on eye diseases, retina surgery and vision correction.",
  keywordsAr: ["مدونة طبية", "نصائح عيون"],
  keywordsEn: ["medical blog", "eye tips"],
  path: "/blog/",
});

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog/" },
        ])}
      />
      <BlogListView posts={posts} />
    </>
  );
}
