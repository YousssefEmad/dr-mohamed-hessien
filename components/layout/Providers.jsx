"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { SiteProvider } from "@/context/SiteContext";

export default function Providers({ children, siteConfig, aboutPage }) {
  return (
    <LanguageProvider>
      <SiteProvider siteConfig={siteConfig} aboutPage={aboutPage}>
        {children}
      </SiteProvider>
    </LanguageProvider>
  );
}
