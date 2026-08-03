"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { uiLabels } from "@/data/navigation";
import { blogPath } from "@/lib/helpers";

export default function HomeBlog({ posts = [], sections }) {
  const { pick, t } = useLanguage();

  return (
    <section className="pt-115 pb-115 blog-style-2">
      <div className="container">
        <div className="section-title text-center mb-50">
          <span className="title-tag">{pick(sections, "blogTag")}</span>
          <h2>{pick(sections, "blogHeading")}</h2>
        </div>

        <div className="row">
          {posts.slice(0, 3).map((post) => (
            <div key={post.id} className="col-lg-4 col-md-6">
              <div className="blog-sing">
                <article
                  className="blog-post"
                  style={{ backgroundImage: `url('${post.image}')` }}
                >
                  <div className="blog-data">
                    <div className="post-date">
                      {pick(post, "dateDisplay")}
                    </div>
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

        <div className="text-center mt-40">
          <Link href="/blog/" className="main-btn btn-filled">
            {t(uiLabels, "viewAllArticles")}
          </Link>
        </div>
      </div>
    </section>
  );
}
