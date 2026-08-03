"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { uiLabels } from "@/data/navigation";

export default function NotFoundView() {
  const { t, lang } = useLanguage();

  return (
    <section
      className="error bg-center bg-cover bg-norepeat"
      style={{ backgroundImage: "url(/img/404.webp)", minHeight: "80vh" }}
    >
      <div className="container text-center pt-200 pb-200">
        <h1 className="text-white mb-30">404</h1>
        <p className="text-white mb-40">
          {lang === "en" ? "Page not found" : "الصفحة غير موجودة"}
        </p>
        <Link href="/" className="main-btn btn-filled">
          {t(uiLabels, "backHome")}
        </Link>
      </div>
    </section>
  );
}
