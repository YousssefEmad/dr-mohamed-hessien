"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/data/site";
import { aboutPage } from "@/data/pages";
import { uiLabels } from "@/data/navigation";

export default function OffCanvas() {
  const { pick, t, lang } = useLanguage();

  return (
    <div className="offcanvas-wrapper">
      <div className="offcanvas-overly" />
      <div className="offcanvas-widget">
        <div className="offcanvas-widget_top">
          <a href="#" className="offcanvas-close" onClick={(e) => e.preventDefault()}>
            <i className="fal fa-times" />
          </a>
          <Image
            src={siteConfig.logo}
            alt={siteConfig.shortNameAr}
            width={140}
            height={70}
          />
        </div>

        <div className="widget about-widget">
          <h5 className="widget-title">{pick(aboutPage, "title")}</h5>
          <p>{pick(aboutPage, "intro")}</p>
          <p>{pick(aboutPage, "doctorLead")}</p>
        </div>

        <div className="widget social-link">
          <h5 className="widget-title">{t(uiLabels, "contactUs")}</h5>

          <div className="Contact-offcanvas">
            <h5 className="widget-title-2">
              <i className="fal fa-phone" />
              <span>{t(uiLabels, "phoneLabel")} :</span>{" "}
              <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>
            </h5>
          </div>

          <div className="Contact-offcanvas">
            <h5 className="widget-title-2">
              <i className="fab fa-whatsapp" />
              <span>{t(uiLabels, "whatsappLabel")} :</span>{" "}
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                {siteConfig.phoneDisplay}
              </a>
            </h5>
          </div>

          <div className="Contact-offcanvas">
            <h5 className="widget-title-2">
              <i className="fal fa-map-marker-alt" />
              <span>{t(uiLabels, "addressLabel")} :</span>{" "}
              <span>
                {lang === "en" ? siteConfig.addressEn : siteConfig.addressAr}
              </span>
            </h5>
          </div>

          <div className="Contact-offcanvas">
            <h5 className="widget-title-2">
              <i className="fal fa-clock" />
              <span>{t(uiLabels, "hoursLabel")} :</span>{" "}
              <span>
                {lang === "en" ? siteConfig.hoursEn : siteConfig.hoursAr}
              </span>
            </h5>
          </div>

          <ul>
            <li>
              <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer">
                <i className="fab fa-facebook-f" />
              </a>
            </li>
            <li>
              <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">
                <i className="fab fa-instagram" />
              </a>
            </li>
            <li>
              <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer">
                <i className="fab fa-youtube" />
              </a>
            </li>
            <li>
              <a href={siteConfig.social.tiktok} target="_blank" rel="noreferrer">
                <i className="fab fa-tiktok" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
