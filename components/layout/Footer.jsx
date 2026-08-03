"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/data/site";
import { footerQuickLinks, uiLabels } from "@/data/navigation";
import { aboutPage } from "@/data/pages";

export default function Footer({ services = [] }) {
  const { pick, t, lang } = useLanguage();

  return (
    <footer className="footer-two">
      <div className="footer-widget-area pt-100 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="widget site-info-widget mb-50">
                <div className="site-logo footer-logo site-logo-text mb-20">
                  <Link href="/">
                    <Image
                      src={siteConfig.logo}
                      alt={siteConfig.shortNameAr}
                      width={140}
                      height={70}
                    />
                  </Link>
                </div>
                <p>{pick(aboutPage, "commitment")}</p>
                <div className="social-links mt-40">
                  <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">
                    <i className="fab fa-instagram" />
                  </a>
                  <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer">
                    <i className="fab fa-youtube" />
                  </a>
                  <a href={siteConfig.social.tiktok} target="_blank" rel="noreferrer">
                    <i className="fab fa-tiktok" />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="widget nav-widget mb-50">
                <h4 className="widget-title text-center">
                  {t(uiLabels, "quickLinks")}
                </h4>
                <ul>
                  {footerQuickLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{pick(link, "label")}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="widget nav-widget mb-50">
                <h4 className="widget-title text-center">
                  {t(uiLabels, "ourServices")}
                </h4>
                <ul className="nav-widget-2">
                  {services.slice(0, 8).map((service) => (
                    <li key={service.id}>
                      <Link href={`/services/${service.slug}/`}>
                        {pick(service, "title")}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="widget contact-widget mb-50">
                <h4 className="widget-title">{t(uiLabels, "contactUs")}</h4>
                <div className="contact-lists">
                  <div className="contact-box">
                    <div className="icon">
                      <i className="flaticon-phone" />
                    </div>
                    <div className="desc">
                      <h6 className="title">{t(uiLabels, "phoneLabel")}</h6>
                      <a href={`tel:${siteConfig.phone}`}>
                        {siteConfig.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="contact-box">
                    <div className="icon">
                      <i className="fab fa-whatsapp" />
                    </div>
                    <div className="desc">
                      <h6 className="title">{t(uiLabels, "whatsappLabel")}</h6>
                      <a href={`https://wa.me/${siteConfig.whatsapp}`}>
                        {siteConfig.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="contact-box">
                    <div className="icon">
                      <i className="flaticon-location-pin" />
                    </div>
                    <div className="desc">
                      <h6 className="title">{t(uiLabels, "addressLabel")}</h6>
                      <span>
                        {lang === "en"
                          ? siteConfig.addressEn
                          : siteConfig.addressAr}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="copyright-area pt-30 pb-30">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-12 text-center">
                  <p className="copyright-text copyright-two">
                    {lang === "en"
                      ? siteConfig.copyrightEn
                      : siteConfig.copyrightAr}{" "}
                    | {t(uiLabels, "designedBy")}{" "}
                    <a
                      href={siteConfig.designer.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {siteConfig.designer.name}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
