"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import { useLanguage } from "@/context/LanguageContext";

export default function LegalPageView({ page }) {
  const { pick, lang } = useLanguage();
  const sections = page.sections || [];

  return (
    <>
      <Breadcrumb titleAr={page.titleAr} titleEn={page.titleEn} />
      <section className="pt-115 pb-115">
        <div className="container">
          <p className="mb-40">
            {lang === "en" ? page.updatedEn : page.updatedAr}
          </p>
          {sections.map((section, index) => (
            <div key={index} className="mb-40">
              <h3 className="mb-20">{pick(section, "title")}</h3>
              <p>{pick(section, "body")}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
