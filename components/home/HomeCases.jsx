"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { uiLabels } from "@/data/navigation";

export default function HomeCases({ items = [], sections }) {
  const { pick, t } = useLanguage();

  return (
    <section className="condos-overlay-sec pt-70 pb-10">
      <div className="container-fluid">
        <div className="section-title text-center mb-50">
          <div className="section-title-icon">
            <i className="fa-solid fa-eye" />
          </div>
          <span className="title-tag">{pick(sections, "casesTag")}</span>
          <h2>{pick(sections, "casesHeading")}</h2>
        </div>

        <div className="row">
          {items.map((item) => (
            <div key={item.id} className="col-lg-3 col-md-6">
              <div
                className="condo-item hotel-intro"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="title">
                  <div className="display-on-hover">
                    <a href={item.image} data-fancybox="cases">
                      <i className="fa-solid fa-eye text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="more-btn">
          <Link href="/gallery/" className="main-btn btn-filled mt-20">
            {t(uiLabels, "viewAllCases")}
          </Link>
        </div>
      </div>
    </section>
  );
}
