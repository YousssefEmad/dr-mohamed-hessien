"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import ContactForm from "@/components/shared/ContactForm";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/data/site";
import { uiLabels } from "@/data/navigation";

export default function ContactPageView({ page, services = [] }) {
  const { pick, t, lang } = useLanguage();

  return (
    <>
      <Breadcrumb titleAr={page.titleAr} titleEn={page.titleEn} />
      <section className="contact-part pt-115 pb-115">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12">
              <div className="contact-info">
                <div className="row justify-content-center">
                  <div className="col-12">
                    <div className="info-box">
                      <div className="icon">
                        <i className="flaticon-home" />
                      </div>
                      <div className="desc">
                        <h4>{t(uiLabels, "addressLabel")}</h4>
                        <p>
                          {lang === "en"
                            ? siteConfig.addressEn
                            : siteConfig.addressAr}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="info-box">
                      <div className="icon">
                        <i className="flaticon-phone" />
                      </div>
                      <div className="desc">
                        <h4>{t(uiLabels, "phoneLabel")}</h4>
                        <p>
                          <a href={`tel:${siteConfig.phone}`}>
                            {siteConfig.phoneDisplay}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="info-box">
                      <div className="icon">
                        <i className="fab fa-whatsapp" />
                      </div>
                      <div className="desc">
                        <h4>{t(uiLabels, "whatsappLabel")}</h4>
                        <p>
                          <a href={`https://wa.me/${siteConfig.whatsapp}`}>
                            {siteConfig.phoneDisplay}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="info-box">
                      <div className="icon">
                        <i className="far fa-clock" />
                      </div>
                      <div className="desc">
                        <h4>{t(uiLabels, "hoursLabel")}</h4>
                        <p>
                          {lang === "en"
                            ? siteConfig.hoursEn
                            : siteConfig.hoursAr}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7 col-md-12">
              <h3 className="mb-30">{pick(page, "formTitle")}</h3>
              <ContactForm services={services} />
              <div className="map mt-50">
                <iframe
                  src={siteConfig.mapEmbed}
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Clinic location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
