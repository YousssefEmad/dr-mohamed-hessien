"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import PhoneLink from "@/components/shared/PhoneLink";
import { useSiteConfig } from "@/context/SiteContext";
import { navigation, uiLabels } from "@/data/navigation";

export default function Header({
  services = [],
  offcanvasOpen = false,
  onToggleOffcanvas,
}) {
  const { pick, t, lang } = useLanguage();
  const siteConfig = useSiteConfig();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenSubmenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", mobileOpen);
    return () => document.body.classList.remove("mobile-menu-open");
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenSubmenu(null);
  };

  const toggleMobile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileOpen((prev) => !prev);
  };

  const handleOffcanvas = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleOffcanvas?.();
  };

  const getChildren = (item) => {
    if (item.childrenKey === "services") {
      return services.map((s) => ({
        id: s.id,
        href: `/services/${s.slug}/`,
        labelAr: s.titleAr,
        labelEn: s.titleEn,
      }));
    }
    return item.children || null;
  };

  const renderNavItems = (mobile = false) =>
    navigation
      .filter((item) => (mobile ? true : !item.mobileOnly))
      .map((item) => {
        const label = pick(item, "label");
        const children = getChildren(item);
        const hasChildren = Boolean(children?.length);

        if (hasChildren) {
          const isOpen = openSubmenu === item.id;

          return (
            <li
              key={item.id}
              className={`menu-item menu-item-has-children${
                isOpen ? " open" : ""
              }`}
            >
              {mobile ? (
                <>
                  <button
                    type="button"
                    className="submenu-toggle"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenSubmenu((prev) =>
                        prev === item.id ? null : item.id
                      )
                    }
                  >
                    <span>{label}</span>
                    <i className={`fal fa-angle-${isOpen ? "up" : "down"}`} />
                  </button>
                  <ul
                    className="sub-menu"
                    style={{ display: isOpen ? "block" : "none" }}
                  >
                    <li className="menu-item">
                      <Link href="/services/" onClick={closeMobile}>
                        {lang === "en" ? "All services" : "كل الخدمات"}
                      </Link>
                    </li>
                    {children.map((child) => (
                      <li key={child.id} className="menu-item">
                        <Link href={child.href} onClick={closeMobile}>
                          {pick(child, "label") || pick(child, "title")}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <Link href={item.href === "#" ? "/services/" : item.href}>
                    {label}
                  </Link>
                  <ul className="sub-menu">
                    {children.map((child) => (
                      <li key={child.id} className="menu-item">
                        <Link href={child.href}>
                          {pick(child, "label") || pick(child, "title")}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          );
        }

        return (
          <li key={item.id} className="menu-item">
            <Link href={item.href} onClick={mobile ? closeMobile : undefined}>
              {label}
            </Link>
          </li>
        );
      });

  return (
    <header className="header-three header-absolute sticky-header sigma-header">
      <div className="header-top">
        <div className="container-fluid container-custom-three">
          <div className="d-md-flex align-items-center justify-content-between">
            <PhoneLink href={`tel:${siteConfig.phone}`}>
              <i className="fal fa-phone" />
              <span>{t(uiLabels, "callUs")}</span>
            </PhoneLink>

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
                  alt={
                    lang === "en"
                      ? siteConfig.shortNameEn
                      : siteConfig.shortNameAr
                  }
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
                <button
                  type="button"
                  id="offCanvasBtn"
                  className={`offcanvas-trigger${
                    offcanvasOpen ? " is-active" : ""
                  }`}
                  onClick={handleOffcanvas}
                  aria-label={
                    lang === "en" ? "Clinic contact info" : "معلومات التواصل"
                  }
                  aria-expanded={offcanvasOpen}
                >
                  <i className="fal fa-address-card" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sigma-mobile-header">
        <div className="container">
          <div className="sigma-mobile-header-inner">
            <div className="site-logo site-logo-text">
              <Link href="/" onClick={closeMobile}>
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.shortNameAr}
                  width={120}
                  height={60}
                />
              </Link>
            </div>
            <div className="sigma-mobile-header-actions">
              <button
                type="button"
                className={`offcanvas-trigger mobile-info-btn${
                  offcanvasOpen ? " is-active" : ""
                }`}
                onClick={handleOffcanvas}
                aria-label={
                  lang === "en" ? "Clinic contact info" : "معلومات التواصل"
                }
                aria-expanded={offcanvasOpen}
              >
                <i className="fal fa-address-card" />
              </button>
              <button
                type="button"
                className={`sigma-hamburger-menu${
                  mobileOpen ? " is-open" : ""
                }`}
                onClick={toggleMobile}
                aria-label={lang === "en" ? "Open menu" : "فتح القائمة"}
                aria-expanded={mobileOpen}
              >
                <span className={`sigma-menu-btn${mobileOpen ? " active" : ""}`}>
                  <span />
                  <span />
                  <span />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`sigma-mobile-backdrop${mobileOpen ? " active" : ""}`}
        onClick={closeMobile}
        aria-hidden={!mobileOpen}
      />

      <aside
        className={`sigma-mobile-menu${mobileOpen ? " active" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className="sigma-mobile-menu-top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="sigma-logo"
            src={siteConfig.logo}
            alt={siteConfig.shortNameAr}
          />
          <button
            type="button"
            className="sigma-mobile-close"
            onClick={closeMobile}
            aria-label={lang === "en" ? "Close menu" : "إغلاق القائمة"}
          >
            <i className="fal fa-times" />
          </button>
        </div>
        <ul className="sigma-main-menu">{renderNavItems(true)}</ul>
      </aside>
    </header>
  );
}
