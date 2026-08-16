"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Loads jQuery + theme plugins once, then re-inits on route change.
 * Menu / offcanvas are handled in React — skip jQuery binders for those.
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
        if (window.mirandaDoc && typeof window.mirandaDoc.init === "function") {
          if (!window.__themeInited) {
            // Disable jQuery menu/offcanvas — React owns these interactions
            window.mirandaDoc.mianMenu = function noopMenu() {};
            window.mirandaDoc.mainNavigation = function noopNav() {};
            window.mirandaDoc.offCanvas = function noopOffcanvas() {};
            window.mirandaDoc.init();
            window.__themeInited = true;
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
      <Script src="/js/vendor/jquery-1.12.4.min.js" strategy="lazyOnload" />
      <Script src="/js/popper.min.js" strategy="lazyOnload" />
      <Script src="/js/bootstrap.min.js" strategy="lazyOnload" />
      <Script src="/js/slick.min.js" strategy="lazyOnload" />
      <Script src="/js/isotope.pkgd.min.js" strategy="lazyOnload" />
      <Script src="/js/jquery.magnific-popup.min.js" strategy="lazyOnload" />
      <Script src="/js/jquery.inview.min.js" strategy="lazyOnload" />
      <Script src="/js/jquery.countTo.js" strategy="lazyOnload" />
      <Script src="/js/jquery.nice-select.min.js" strategy="lazyOnload" />
      <Script
        src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js"
        strategy="lazyOnload"
      />
      <Script src="/js/main.js" strategy="lazyOnload" />
    </>
  );
}
