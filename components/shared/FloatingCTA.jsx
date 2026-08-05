"use client";

import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/data/site";

export default function FloatingCTA() {
  const { lang } = useLanguage();
  const callLabel = lang === "en" ? "Call" : "اتصل";
  const whatsappLabel = lang === "en" ? "WhatsApp" : "واتساب";
  const whatsappMessage =
    lang === "en"
      ? "Hello, I would like to book an appointment"
      : "السلام عليكم، أريد حجز موعد";

  return (
    <div className="floating-cta" aria-label={lang === "en" ? "Quick contact" : "تواصل سريع"}>
      <a
        href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
        className="floating-cta__btn floating-cta__btn--whatsapp"
        target="_blank"
        rel="noreferrer"
        aria-label={whatsappLabel}
        title={whatsappLabel}
      >
        <i className="fab fa-whatsapp" aria-hidden="true" />
        <span className="floating-cta__text">{whatsappLabel}</span>
      </a>
      <a
        href={`tel:${siteConfig.phone}`}
        className="floating-cta__btn floating-cta__btn--call phone-ltr"
        dir="ltr"
        aria-label={callLabel}
        title={callLabel}
      >
        <i className="fal fa-phone" aria-hidden="true" />
        <span className="floating-cta__text">{callLabel}</span>
      </a>
    </div>
  );
}
