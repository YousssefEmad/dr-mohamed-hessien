"use client";

import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useLanguage } from "@/context/LanguageContext";

export default function VideosPageView({ videos = [], page }) {
  const { pick, lang } = useLanguage();

  return (
    <>
      <Breadcrumb titleAr={page.titleAr} titleEn={page.titleEn} />
      <section className="Video pt-70 pb-80">
        <div className="container">
          <div className="section-title text-center mb-50">
            <div className="section-title-icon">
              <i className="fa-solid fa-video" />
            </div>
            <h2>{pick(page, "subtitle")}</h2>
          </div>
          <div className="row">
            {videos.map((video) => (
              <div key={video.id} className="col-md-6 col-lg-4 mb-30">
                <div className="p-4 border h-100">
                  <h4 className="mb-3">{pick(video, "title")}</h4>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noreferrer"
                    className="main-btn btn-filled"
                  >
                    {lang === "en" ? "Watch on Facebook" : "مشاهدة على فيسبوك"}
                  </a>
                  {video.serviceSlug ? (
                    <div className="mt-3">
                      <Link href={`/services/${video.serviceSlug}/`}>
                        {lang === "en" ? "Related service" : "الخدمة المرتبطة"}
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
