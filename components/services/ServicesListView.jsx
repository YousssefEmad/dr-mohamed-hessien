"use client";

import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useLanguage } from "@/context/LanguageContext";
import { uiLabels } from "@/data/navigation";
import { homeSections } from "@/data/pages";

export default function ServicesListView({ services = [] }) {
  const { pick, t } = useLanguage();

  return (
    <>
      <Breadcrumb
        titleAr="الخدمات الطبية"
        titleEn="Medical Services"
        items={[
          {
            labelAr: "الخدمات الطبية",
            labelEn: "Medical Services",
          },
        ]}
      />

      <section className="image-type-section pt-70 pb-115 mt-35" id="bg-none">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="section-title text-center mb-50">
                <span className="title-tag">
                  {pick(homeSections, "servicesTag")}
                </span>
                <h2>{pick(homeSections, "servicesHeading")}</h2>
              </div>
            </div>
          </div>

          <div className="room-items">
            <div className="row justify-content-center">
              {services.map((service) => (
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
        </div>
      </section>
    </>
  );
}
