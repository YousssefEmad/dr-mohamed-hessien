"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import PhoneLink from "@/components/shared/PhoneLink";
import SocialLinks from "@/components/shared/SocialLinks";
import { siteConfig } from "@/data/site";
import { aboutPage } from "@/data/pages";
import { uiLabels } from "@/data/navigation";

export default function OffCanvas({ open = false, onClose }) {
  const { pick, t, lang } = useLanguage();

  const handleClose = (e) => {
    e?.preventDefault?.();
    onClose?.();
  };

  return (
    <div className={`offcanvas-wrapper${open ? " show-offcanvas" : ""}`}>
      <div
        className={`offcanvas-overly${open ? " show-overly" : ""}`}
        onClick={handleClose}
        aria-hidden={!open}
      />
      <div
        className="offcanvas-widget"
        role="dialog"
        aria-modal="true"
        aria-label={lang === "en" ? "Clinic contact info" : "معلومات التواصل"}
      >
        <div className="offcanvas-widget_top">
          <button
            type="button"
            className="offcanvas-close"
            onClick={handleClose}
            aria-label={lang === "en" ? "Close" : "إغلاق"}
          >
            <i className="fal fa-times" />
          </button>
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
        </div>

        <div className="widget social-link offcanvas-contact-block">
          <h5 className="widget-title">{t(uiLabels, "contactUs")}</h5>

          <div className="offcanvas-contact-item">
            <div className="offcanvas-contact-icon">
              <i className="fal fa-phone" />
            </div>
            <div className="offcanvas-contact-body">
              <span className="offcanvas-contact-label">
                {t(uiLabels, "phoneLabel")}
              </span>
              <PhoneLink href={`tel:${siteConfig.phone}`}>
                {siteConfig.phoneDisplay}
              </PhoneLink>
            </div>
          </div>

          <div className="offcanvas-contact-item">
            <div className="offcanvas-contact-icon">
              <i className="fab fa-whatsapp" />
            </div>
            <div className="offcanvas-contact-body">
              <span className="offcanvas-contact-label">
                {t(uiLabels, "whatsappLabel")}
              </span>
              <PhoneLink
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                {siteConfig.phoneDisplay}
              </PhoneLink>
            </div>
          </div>

          <div className="offcanvas-contact-item">
            <div className="offcanvas-contact-icon">
              <i className="fal fa-map-marker-alt" />
            </div>
            <div className="offcanvas-contact-body">
              <span className="offcanvas-contact-label">
                {t(uiLabels, "addressLabel")}
              </span>
              <span>
                {lang === "en" ? siteConfig.addressEn : siteConfig.addressAr}
              </span>
            </div>
          </div>

          <div className="offcanvas-contact-item">
            <div className="offcanvas-contact-icon">
              <i className="fal fa-clock" />
            </div>
            <div className="offcanvas-contact-body">
              <span className="offcanvas-contact-label">
                {t(uiLabels, "hoursLabel")}
              </span>
              <span>
                {lang === "en" ? siteConfig.hoursEn : siteConfig.hoursAr}
              </span>
            </div>
          </div>

          <SocialLinks asList className="offcanvas-social-list" />
        </div>
      </div>
    </div>
  );
}
