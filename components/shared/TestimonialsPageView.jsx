"use client";

import Image from "next/image";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useLanguage } from "@/context/LanguageContext";

export default function TestimonialsPageView({ items = [], page }) {
  const { pick } = useLanguage();

  return (
    <>
      <Breadcrumb titleAr={page.titleAr} titleEn={page.titleEn} />
      <section className="team-section pt-120 pb-120">
        <div className="container">
          <div className="section-title text-center mb-50">
            <h2>{pick(page, "subtitle")}</h2>
          </div>
          <div className="row">
            {items.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6 mb-30">
                <div className="member-box">
                  <a data-fancybox="reviews" href={item.image}>
                    <div className="member-img">
                      <Image
                        src={item.image}
                        alt={pick(item, "name")}
                        width={400}
                        height={500}
                      />
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
