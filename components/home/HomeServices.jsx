"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/data/site";
import { uiLabels } from "@/data/navigation";

const HOME_SERVICES_LIMIT = 2;

export default function HomeServices({ services = [], sections }) {
  const { pick, t } = useLanguage();
  const preview = services.slice(0, HOME_SERVICES_LIMIT);

  return (
    <section
      className="image-type-section pt-115 pb-115"
      style={{ backgroundImage: `url(${siteConfig.breadcrumbBg})` }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12">
            <div className="section-title text-center mb-50">
              <span className="title-tag">{pick(sections, "servicesTag")}</span>
              <h2>{pick(sections, "servicesHeading")}</h2>
            </div>
          </div>
        </div>

        <div className="room-items">
          <div className="row justify-content-center">
            {preview.map((service) => (
              <div key={service.id} className="col-lg-6 col-md-6 col-12">
                <div className="room-box">
                  <div
                    className="room-bg"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                  <div className="room-content">
                    <h3>
                      <Link href={`/services/${service.slug}/`}>
                        {pick(service, "title")}
                      </Link>
                    </h3>
                    <span className="room-count">
                      <Link href={`/services/${service.slug}/`}>
                        <i className={service.icon || "fal fa-eye"} />
                        <span>{t(uiLabels, "serviceDetails")}</span>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {services.length > HOME_SERVICES_LIMIT ? (
          <div className="text-center mt-40">
            <Link href="/services/" className="main-btn btn-filled">
              {t(uiLabels, "viewAllServices")}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
