"use client";

import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useLanguage } from "@/context/LanguageContext";
import { uiLabels } from "@/data/navigation";
import { homeSections } from "@/data/pages";
import { blogPath } from "@/lib/helpers";

export default function BlogListView({ posts = [] }) {
  const { pick, t } = useLanguage();

  return (
    <>
      <Breadcrumb
        titleAr="المدونة"
        titleEn="Blog"
        items={[{ labelAr: "المدونة", labelEn: "Blog" }]}
      />

      <section className="latest-news blog-style-2 pt-120 pb-120">
        <div className="section-fw container">
          <div className="section-title text-center mb-50">
            <span className="title-tag">{pick(homeSections, "blogTag")}</span>
            <h2>{pick(homeSections, "blogHeading")}</h2>
          </div>
          <div className="row">
            {posts.map((post) => (
              <div key={post.id} className="col-lg-4 col-md-6 mb-30">
                <div className="blog-sing">
                  <article
                    className="blog-post"
                    style={{ backgroundImage: `url('${post.image}')` }}
                  >
                    <div className="blog-data">
                      <div className="post-date">{pick(post, "dateDisplay")}</div>
                      <h3 className="post-title">
                        <Link href={blogPath(post.slug)}>
                          {pick(post, "title")}
                        </Link>
                      </h3>
                      <Link href={blogPath(post.slug)} className="post-link">
                        <span>{t(uiLabels, "readMore")}</span>
                      </Link>
                    </div>
                    <Link href={blogPath(post.slug)} />
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
