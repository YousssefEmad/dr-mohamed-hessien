"use client";

import { createContext, useContext } from "react";
import { siteConfig as localSite } from "@/data/site";
import { aboutPage as localAbout } from "@/data/pages";

const SiteContext = createContext({
  siteConfig: localSite,
  aboutPage: localAbout,
});

export function SiteProvider({ children, siteConfig, aboutPage }) {
  return (
    <SiteContext.Provider
      value={{
        siteConfig: siteConfig || localSite,
        aboutPage: aboutPage || localAbout,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteConfig() {
  return useContext(SiteContext).siteConfig;
}

export function useAboutPage() {
  return useContext(SiteContext).aboutPage;
}

export default SiteContext;
