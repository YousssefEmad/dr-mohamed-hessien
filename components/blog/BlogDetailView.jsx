"use client";

import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/layout/Breadcrumb";
import SafeHtml from "@/components/ui/SafeHtml";
import { useLanguage } from "@/context/LanguageContext";
import { uiLabels } from "@/data/navigation";
import { blogPath } from "@/lib/helpers";

export default function BlogDetailView({
  post,
  related = [],
  prev,
  next,
  latest = [],
}) {
  const { pick, t } = useLanguage();

  return (
    <>
      <Breadcrumb
        titleAr={post.titleAr}
        titleEn={post.titleEn}
        items={[
          { href: "/blog/", labelAr: "المدونة", labelEn: "Blog" },
          { labelAr: post.titleAr, labelEn: post.titleEn },
        ]}
      />

      <section className="blog-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="news-details-box">
                <div className="entry-content">
                  <figure className="mt-15 mb-45">
                    <Image
                      src={post.image}
                      alt={pick(post, "title")}
                      width={900}
                      height={560}
                      className="img-fluid"
                    />
                  </figure>
                  <h2 className="title">{pick(post, "title")}</h2>
                  <ul className="post-meta">
                    <li>
                      <span>
                        <i className="fal fa-calendar-alt" />{" "}
                        {pick(post, "dateDisplay")}
                      </span>
                    </li>
                  </ul>
                  <SafeHtml html={pick(post, "content")} />
                </div>

                <div className="entry-footer">
                  <div className="d-flex justify-content-between flex-wrap gap-3 mt-40 mb-40">
                    {prev ? (
                      <Link href={blogPath(prev.slug)} className="main-btn btn-filled">
                        {t(uiLabels, "previous")}: {pick(prev, "title")}
                      </Link>
                    ) : (
                      <span />
                    )}
                    {next ? (
                      <Link href={blogPath(next.slug)} className="main-btn btn-filled">
                        {t(uiLabels, "next")}: {pick(next, "title")}
                      </Link>
                    ) : null}
                  </div>

                  {related.length ? (
                    <div className="related-post mt-50 blog-style-2">
                      <h3 className="mb-30">{t(uiLabels, "relatedPosts")}</h3>
                      <div className="row">
                        {related.map((item) => (
                          <div key={item.id} className="col-md-6">
                            <div className="blog-sing">
                              <article
                                className="blog-post"
                                style={{
                                  backgroundImage: `url('${item.image}')`,
                                }}
                              >
                                <div className="blog-data">
                                  <div className="post-date">
                                    {pick(item, "dateDisplay")}
                                  </div>
                                  <h3 className="post-title">
                                    <Link href={blogPath(item.slug)}>
                                      {pick(item, "title")}
                                    </Link>
                                  </h3>
                                  <Link
                                    href={blogPath(item.slug)}
                                    className="post-link"
                                  >
                                    <span>{t(uiLabels, "readMore")}</span>
                                  </Link>
                                </div>
                                <Link href={blogPath(item.slug)} />
                              </article>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-8 col-sm-10">
              <div className="sidebar sidebar-sticky">
                <div className="widget popular-feeds mb-40">
                  <h5 className="widget-title">{t(uiLabels, "latestArticles")}</h5>
                  <div className="popular-feed-loop">
                    {latest.map((item) => (
                      <div key={item.id} className="single-popular-feed">
                        <div className="feed-img">
                          <Image
                            src={item.image}
                            alt={pick(item, "title")}
                            width={90}
                            height={90}
                          />
                        </div>
                        <div className="feed-desc">
                          <h6>
                            <Link href={blogPath(item.slug)}>
                              {pick(item, "title")}
                            </Link>
                          </h6>
                          <span className="time">
                            <i className="far fa-eye" /> {t(uiLabels, "readMore")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
