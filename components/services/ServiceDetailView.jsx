"use client";

import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ContactForm from "@/components/shared/ContactForm";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/data/site";
import { uiLabels } from "@/data/navigation";

export default function ServiceDetailView({
  service,
  related = [],
  faqs = [],
  allServices = [],
}) {
  const { pick, t, lang } = useLanguage();
  const highlights =
    lang === "en" ? service.highlightsEn : service.highlightsAr;
  const whyChoose = lang === "en" ? service.whyChooseEn : service.whyChooseAr;
  const sections = service.sections || [];

  return (
    <>
      <Breadcrumb
        titleAr={service.titleAr}
        titleEn={service.titleEn}
        items={[
          {
            href: "/services/",
            labelAr: "الخدمات",
            labelEn: "Services",
          },
          {
            labelAr: service.titleAr,
            labelEn: service.titleEn,
          },
        ]}
      />

      <section className="service-section pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center column-reverse">
            <div className="col-lg-8">
              <div className="news-details-box">
                <div className="entry-content features-loop">
                  <figure className="mt-15 mb-45">
                    <Image
                      src={service.image}
                      alt={pick(service, "title")}
                      width={900}
                      height={560}
                      className="img-fluid"
                    />
                  </figure>

                  <div className="feature-box mb-30 mt-0 wow fadeInLeft" data-wow-delay=".3s">
                    <h3>{pick(service, "title")}</h3>
                    <span className="count">01</span>
                  </div>

                  {pick(service, "hero") ? (
                    <h3 className="subtitle">{pick(service, "hero")}</h3>
                  ) : null}

                  <p className="mb-30">{pick(service, "description")}</p>

                  {sections.map((section, index) => (
                    <div key={index} className="mb-30">
                      <div className="gap" />
                      <h3 className="subtitle">{pick(section, "title")}</h3>
                      {pick(section, "body") ? (
                        <p className="mb-20">{pick(section, "body")}</p>
                      ) : null}
                      {(lang === "en" ? section.listEn : section.listAr)?.length ? (
                        <ul className="list-icon">
                          {(lang === "en" ? section.listEn : section.listAr).map(
                            (item) => (
                              <li key={item}>{item}</li>
                            )
                          )}
                        </ul>
                      ) : null}
                    </div>
                  ))}

                  {highlights?.length ? (
                    <>
                      <div className="gap" />
                      <h3 className="subtitle">
                        {lang === "en" ? "Key Benefits" : "لماذا تختار هذه الخدمة؟"}
                      </h3>
                      <ul className="list-icon">
                        {highlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  {whyChoose?.length ? (
                    <>
                      <div className="gap" />
                      <h3 className="subtitle">
                        {lang === "en"
                          ? "Why choose our clinic?"
                          : "لماذا تختار عيادتنا؟"}
                      </h3>
                      <ul className="list-icon">
                        {whyChoose.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  {pick(service, "cta") ? (
                    <p className="mb-30 mt-30">{pick(service, "cta")}</p>
                  ) : null}

                  {faqs?.length ? (
                    <div className="mt-50">
                      <h3 className="box-title">FAQ</h3>
                      {faqs.map((faq) => (
                        <div key={faq.id} className="mb-20">
                          <h5>{pick(faq, "question")}</h5>
                          <p>{pick(faq, "answer")}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {service.videos?.length ? (
                    <div className="mt-40 service-video-list">
                      <h3 className="box-title">
                        {lang === "en" ? "Related Videos" : "فيديوهات مرتبطة"}
                      </h3>
                      {service.videos.map((url) => (
                        <a
                          key={url}
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="d-block mb-2"
                        >
                          {url}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="comment-template mt-50">
                  <h3 className="box-title">{t(uiLabels, "bookAppointment")}</h3>
                  <ContactForm services={allServices} />
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="sidebar">
                <div className="widget popular-feeds mb-40">
                  <h5 className="widget-title">{t(uiLabels, "relatedServices")}</h5>
                  <div className="popular-feed-loop">
                    {related.map((item) => (
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
                            <Link href={`/services/${item.slug}/`}>
                              {pick(item, "title")}
                            </Link>
                          </h6>
                          <span className="time">
                            <i className="fas fa-eye" />{" "}
                            {lang === "en"
                              ? "Eye care & surgery"
                              : "خدمات طب وجراحات العيون"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="widget twitter-feed-widget mb-40">
                  <h5 className="widget-title">{t(uiLabels, "addressLabel")}</h5>
                  <div className="twitter-looop">
                    <div className="map">
                      <iframe
                        src={siteConfig.mapEmbed}
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        title="Clinic map"
                      />
                    </div>
                  </div>
                </div>

                <div className="widget socail-widget mb-40">
                  <h5 className="widget-title">{t(uiLabels, "followUs")}</h5>
                  <ul>
                    <li>
                      <a href={siteConfig.social.facebook}>
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href={siteConfig.social.instagram}>
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href={siteConfig.social.youtube}>
                        <i className="fab fa-youtube" />
                      </a>
                    </li>
                    <li>
                      <a href={siteConfig.social.tiktok}>
                        <i className="fab fa-tiktok" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
