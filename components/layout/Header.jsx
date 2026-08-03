"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import { siteConfig } from "@/data/site";
import { navigation, uiLabels } from "@/data/navigation";

export default function Header({ services = [] }) {
  const { pick, t, lang } = useLanguage();

  const renderNavItems = (mobile = false) =>
    navigation
      .filter((item) => (mobile ? true : !item.mobileOnly))
      .map((item) => {
        const label = pick(item, "label");
        const hasServiceChildren = item.childrenKey === "services";
        const children = hasServiceChildren
          ? services.map((s) => ({
              id: s.id,
              href: `/services/${s.slug}/`,
              labelAr: s.titleAr,
              labelEn: s.titleEn,
            }))
          : item.children || null;

        if (children && children.length) {
          return (
            <li key={item.id} className="menu-item menu-item-has-children">
              <Link href={item.href === "#" ? "/services/" : item.href}>
                {label}
              </Link>
              <ul className="sub-menu">
                {children.map((child) => (
                  <li key={child.id} className="menu-item">
                    <Link href={child.href}>{pick(child, "label") || pick(child, "title")}</Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        }

        return (
          <li key={item.id} className="menu-item">
            <Link href={item.href}>{label}</Link>
          </li>
        );
      });

  return (
    <header className="header-three header-absolute sticky-header sigma-header">
      <div className="header-top">
        <div className="container-fluid container-custom-three">
          <div className="d-md-flex align-items-center justify-content-between">
            <a href={`tel:${siteConfig.phone}`}>
              <i className="fal fa-phone" />
              <span>{t(uiLabels, "callUs")}</span>
            </a>

            <ul className="header-top-info">
              <li>
                <i className="fal fa-map-marker-alt" />
                <span>
                  {lang === "en" ? siteConfig.addressEn : siteConfig.addressAr}
                </span>
              </li>
              <li>
                <i className="fal fa-clock" />
                <span>
                  {lang === "en" ? siteConfig.hoursEn : siteConfig.hoursAr}
                </span>
              </li>
              <li>
                <LanguageSwitcher />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="main-menu-area sticky-header">
        <div className="container-fluid container-custom-three">
          <div
            className="nav-container d-flex align-items-center justify-content-between"
            id="nav-container"
          >
            <div className="site-logo site-logo-text">
              <Link href="/">
                <Image
                  src={siteConfig.logo}
                  alt={lang === "en" ? siteConfig.shortNameEn : siteConfig.shortNameAr}
                  width={140}
                  height={70}
                  priority
                />
              </Link>
            </div>

            <div className="nav-menu d-lg-flex align-items-center justify-content-between">
              <div className="navbar-close">
                <div className="cross-wrap">
                  <span className="top" />
                  <span className="bottom" />
                </div>
              </div>

              <div className="sigma-header-nav">
                <div className="container">
                  <div className="sigma-header-nav-inner">
                    <nav>
                      <ul className="sigma-main-menu">{renderNavItems(false)}</ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-right-buttons">
              <div className="toggle">
                <a href="#" id="offCanvasBtn" onClick={(e) => e.preventDefault()}>
                  <i className="fal fa-bars" />
                </a>
              </div>
              <div className="navbar-toggler">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sigma-mobile-header">
        <div className="container">
          <div className="sigma-mobile-header-inner">
            <div className="site-logo site-logo-text">
              <Link href="/">
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.shortNameAr}
                  width={120}
                  height={60}
                />
              </Link>
            </div>
            <div className="sigma-hamburger-menu">
              <div className="sigma-menu-btn">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside className="sigma-mobile-menu">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="sigma-logo mt-5" src={siteConfig.logo} alt={siteConfig.shortNameAr} />
        <ul className="sigma-main-menu">{renderNavItems(true)}</ul>
      </aside>
    </header>
  );
}
