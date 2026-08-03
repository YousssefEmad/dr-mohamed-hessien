"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function SectionTitle({
  tag,
  tagAr,
  tagEn,
  title,
  titleAr,
  titleEn,
  center = false,
  className = "mb-50",
}) {
  const { pick, lang } = useLanguage();
  const tagText =
    tag ||
    (tagAr || tagEn
      ? lang === "en"
        ? tagEn || tagAr
        : tagAr || tagEn
      : "");
  const titleText =
    title ||
    (titleAr || titleEn
      ? lang === "en"
        ? titleEn || titleAr
        : titleAr || titleEn
      : "");

  return (
    <div className={`section-title ${center ? "text-center" : ""} ${className}`}>
      {tagText ? <span className="title-tag">{tagText}</span> : null}
      {titleText ? <h2>{titleText}</h2> : null}
    </div>
  );
}
