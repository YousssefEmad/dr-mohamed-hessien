"use client";

import { useLanguage } from "@/context/LanguageContext";
import { uiLabels } from "@/data/navigation";

export default function LanguageSwitcher({ className = "lang-switch-btn" }) {
  const { toggleLang, t } = useLanguage();

  return (
    <button
      type="button"
      className={className}
      onClick={toggleLang}
      aria-label="Switch language"
    >
      {t(uiLabels, "langSwitch")}
    </button>
  );
}
