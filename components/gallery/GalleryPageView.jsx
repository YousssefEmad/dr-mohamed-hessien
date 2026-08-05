"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import { useLanguage } from "@/context/LanguageContext";

export default function GalleryPageView({ items = [], page }) {
  const { pick } = useLanguage();

  return (
    <>
      <Breadcrumb titleAr={page.titleAr} titleEn={page.titleEn} />
      <section className="condos-overlay-sec pt-70 pb-10">
        <div className="container-fluid">
          <div className="section-title text-center mb-50">
            <div className="section-title-icon">
              <i className="fa-solid fa-image" />
            </div>
            <h2>{pick(page, "subtitle")}</h2>
          </div>
          <div className="row">
            {items.map((item) => (
              <div key={item.id} className="col-lg-3 col-md-6 mb-30">
                <div
                  className="condo-item hotel-intro case-card wow fadeInUp"
                  data-wow-delay=".3s"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="case-card__overlay">
                    <h4>{pick(item, "title")}</h4>
                    {pick(item, "caption") ? (
                      <p>{pick(item, "caption")}</p>
                    ) : null}
                    <a
                      href={item.image}
                      data-fancybox="cases"
                      className="case-card__view"
                    >
                      <i className="fa-solid fa-eye" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="gap" />
        </div>
      </section>
    </>
  );
}
