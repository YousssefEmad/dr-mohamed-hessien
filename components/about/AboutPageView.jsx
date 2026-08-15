"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/layout/Breadcrumb";
import SafeHtml from "@/components/ui/SafeHtml";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteConfig } from "@/context/SiteContext";
import { uiLabels } from "@/data/navigation";

export default function AboutPageView({ about, services = [] }) {
  const { pick, t, lang } = useLanguage();
  const siteConfig = useSiteConfig();
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (!videoOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setVideoOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [videoOpen]);

  const closeVideo = () => setVideoOpen(false);

  return (
    <>
      <Breadcrumb titleAr={about.titleAr} titleEn={about.titleEn} />

      <section className="about-section pt-115 pb-115">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-7 col-md-10">
              <div className="banner-thumb">
                <Image
                  src={about.image}
                  alt={pick(about, "heading")}
                  width={700}
                  height={800}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-5 col-md-8">
              <div className="abour-text pl-20">
                <div className="section-title mb-30">
                  <span className="title-tag">{pick(about, "title")}</span>
                  <h2>{pick(about, "heading")}</h2>
                </div>
                <SafeHtml html={pick(about, "fullText")} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-block with-pattern pt-115 pb-115">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 col-md-10 order-2 order-lg-1">
              <div className="block-text">
                <div className="section-title mb-20">
                  <span className="title-tag">{pick(about, "expertiseTitle")}</span>
                  <h2>{pick(about, "expertiseHeading")}</h2>
                </div>
                <SafeHtml html={pick(about, "expertiseText")} className="pr-50" as="div" />
                <Link href="/contact/" className="main-btn btn-filled mt-40">
                  {t(uiLabels, "bookNow")}
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-10 order-1 order-lg-2">
              <div className="video-wrap video-wrap-two video-wrap-plain mb-small">
                <button
                  type="button"
                  className="popup-video"
                  onClick={() => setVideoOpen(true)}
                  aria-label={lang === "en" ? "Play video" : "تشغيل الفيديو"}
                >
                  <i className="fas fa-play" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="pattern-wrap"
          style={{ backgroundImage: `url('${about.patternImage}')` }}
        >
          <div className="pattern" />
        </div>
      </section>

      <section className="pt-80 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-40">
              <h3>{pick(about, "missionTitle")}</h3>
              <p>{pick(about, "mission")}</p>
            </div>
            <div className="col-lg-6 mb-40">
              <h3>{pick(about, "visionTitle")}</h3>
              <p>{pick(about, "vision")}</p>
            </div>
            <div className="col-lg-6 mb-40">
              <h3>{pick(about, "goalsTitle")}</h3>
              <ul className="list-icon">
                {(lang === "en" ? about.goalsEn : about.goalsAr).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6 mb-40">
              <h3>{pick(about, "whyTitle")}</h3>
              <ul className="list-icon">
                {(lang === "en" ? about.whyEn : about.whyAr).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="section-title mb-40">
            <h2>{pick(about, "careAreasTitle")}</h2>
          </div>
          <div className="row">
            {services.map((service) => (
              <div key={service.id} className="col-md-6 col-lg-4 mb-30">
                <Link href={`/services/${service.slug}/`} className="d-block p-3 border">
                  {pick(service, "title")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {videoOpen ? (
        <div className="video-popup" role="dialog" aria-modal="true">
          <div className="video-popup__backdrop" onClick={closeVideo} />
          <div className="video-popup__dialog">
            <button
              type="button"
              className="video-popup__close"
              onClick={closeVideo}
              aria-label={lang === "en" ? "Close video" : "إغلاق الفيديو"}
            >
              <i className="fal fa-times" />
            </button>
            <video
              className="video-popup__player"
              src={siteConfig.videoBanner}
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
