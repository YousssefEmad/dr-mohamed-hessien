import { siteConfig } from "@/data/site";

export default function manifest() {
  return {
    name: siteConfig.nameEn,
    short_name: siteConfig.shortNameEn,
    description: siteConfig.taglineEn,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f3041",
    lang: "ar",
    dir: "rtl",
    icons: [
      {
        src: "/img/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/img/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
