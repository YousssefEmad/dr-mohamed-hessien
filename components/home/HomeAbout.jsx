"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import SafeHtml from "@/components/ui/SafeHtml";
import { siteConfig } from "@/data/site";
import { uiLabels } from "@/data/navigation";

export default function HomeAbout({ about, sections }) {
  const { pick, t, lang } = useLanguage();

  return (
    <section className="about-section pt-115 pb-115">
      <div className="d-none d-md-block vertical-text wow fadeIn" data-wow-delay=".3s">
        <ul>
          <li>
            <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer">
              <i className="fab fa-facebook" /> Facebook
            </a>
          </li>
          <li>
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">
              <i className="fab fa-instagram" /> Instagram
            </a>
          </li>
          <li>
            <a href={siteConfig.social.tiktok} target="_blank" rel="noreferrer">
              <i className="fab fa-tiktok" /> TikTok
            </a>
          </li>
        </ul>
      </div>

      <div className="d-none d-md-block vertical-text right wow fadeIn" data-wow-delay=".3s">
        <span>{t(uiLabels, "callUsShort")}</span>
        <a href={`tel:${siteConfig.phone}`}>
          <span>{siteConfig.phoneDisplay}</span>
        </a>
      </div>

      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-7 col-md-10 wow fadeInLeft parallax_scroll_down" data-wow-delay=".3s">
            <div className="row about-features-boxes fetaure-masonary">
              <div className="banner-thumb d-md-block">
                <Image
                  src={about.image || siteConfig.doctorImage}
                  alt={lang === "en" ? siteConfig.shortNameEn : siteConfig.shortNameAr}
                  width={700}
                  height={800}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-md-8 col-sm-10 wow fadeInRight parallax_scroll_up" data-wow-delay=".3s">
            <div className="abour-text pl-20">
              <div className="section-title mb-30">
                <span className="title-tag">{pick(sections, "aboutTag")}</span>
                <h2>{pick(about, "heading")}</h2>
              </div>
              <SafeHtml html={pick(about, "fullText")} as="div" />
              <Link href="/about/" className="main-btn btn-filled mt-40">
                {t(uiLabels, "learnMore")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
