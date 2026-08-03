"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Loads jQuery + theme plugins once, then re-inits on route change.
 */
export default function ClientPlugins() {
  const pathname = usePathname();
  const fancyboxReady = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let cancelled = false;

    const initTheme = () => {
      if (cancelled || !window.jQuery) return;
      const $ = window.jQuery;

      try {
        if (window.WOW) {
          new window.WOW({
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: false,
            live: true,
          }).init();
        }
      } catch (_) {
        /* ignore */
      }

      try {
        if (window.mirandaDoc && typeof window.mirandaDoc.init === "function") {
          // Avoid double-binding: only run lighter pieces if already inited
          if (!window.__themeInited) {
            window.mirandaDoc.init();
            window.__themeInited = true;
          } else {
            if (typeof window.mirandaDoc.mianMenu === "function") {
              // re-bind mobile menu for new DOM
            }
          }
        }
      } catch (_) {
        /* ignore */
      }

      try {
        if (window.Fancybox && !fancyboxReady.current) {
          window.Fancybox.bind("[data-fancybox]");
          fancyboxReady.current = true;
        } else if (window.Fancybox) {
          window.Fancybox.unbind("[data-fancybox]");
          window.Fancybox.bind("[data-fancybox]");
        }
      } catch (_) {
        /* ignore */
      }

      try {
        $("select").niceSelect && $("select").niceSelect();
      } catch (_) {
        /* ignore */
      }
    };

    const timer = setTimeout(initTheme, 100);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <>
      <Script
        src="/js/vendor/jquery-1.12.4.min.js"
        strategy="afterInteractive"
      />
      <Script src="/js/popper.min.js" strategy="afterInteractive" />
      <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
      <Script src="/js/slick.min.js" strategy="afterInteractive" />
      <Script src="/js/isotope.pkgd.min.js" strategy="afterInteractive" />
      <Script
        src="/js/jquery.magnific-popup.min.js"
        strategy="afterInteractive"
      />
      <Script src="/js/jquery.inview.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.countTo.js" strategy="afterInteractive" />
      <Script
        src="/js/jquery.nice-select.min.js"
        strategy="afterInteractive"
      />
      <Script src="/js/wow.min.js" strategy="afterInteractive" />
      <Script
        src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js"
        strategy="afterInteractive"
      />
      <Script src="/js/main.js" strategy="afterInteractive" />
    </>
  );
}
