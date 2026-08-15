"use client";

import { useSiteConfig } from "@/context/SiteContext";

export default function HomeBanner() {
  const siteConfig = useSiteConfig();
  return (
    <section className="banner-area banner-style-two" id="bannerSlider">
      <div className="single-banner d-flex align-items-center justify-content-center">
        <div className="circle-out" />
        <div className="banner-video">
          <video autoPlay muted loop playsInline>
            <source src={siteConfig.videoBanner} type="video/mp4" />
          </video>
        </div>
        <div className="banner-overly" />
      </div>
    </section>
  );
}
