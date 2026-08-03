"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/data/site";
import { uiLabels } from "@/data/navigation";

export default function Breadcrumb({
  title,
  titleAr,
  titleEn,
  items = [],
  background,
}) {
  const { pick, t, lang } = useLanguage();
  const pageTitle =
    title ||
    (lang === "en" ? titleEn || titleAr : titleAr || titleEn) ||
    "";
  const bg = background || siteConfig.breadcrumbBg;

  return (
    <section
      className="breadcrumb-area"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="container">
        <div className="breadcrumb-text">
          <h2 className="page-title">{pageTitle}</h2>
          <ul className="breadcrumb-nav">
            <li>
              <Link href="/">{t(uiLabels, "home")}</Link>
            </li>
            {items.map((item, index) => (
              <li
                key={`${item.labelAr || item.label}-${index}`}
                className={item.href ? undefined : "active"}
              >
                {item.href ? (
                  <Link href={item.href}>{pick(item, "label")}</Link>
                ) : (
                  pick(item, "label") || pageTitle
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
