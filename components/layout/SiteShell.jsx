"use client";

import { useCallback, useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OffCanvas from "@/components/layout/OffCanvas";
import Preloader from "@/components/layout/Preloader";
import ClientPlugins from "@/components/layout/ClientPlugins";
import FloatingCTA from "@/components/shared/FloatingCTA";

export default function SiteShell({ children, services = [] }) {
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);

  const closeOffcanvas = useCallback(() => setOffcanvasOpen(false), []);
  const toggleOffcanvas = useCallback(
    () => setOffcanvasOpen((prev) => !prev),
    []
  );

  useEffect(() => {
    document.body.classList.toggle("offcanvas-open", offcanvasOpen);
    return () => document.body.classList.remove("offcanvas-open");
  }, [offcanvasOpen]);

  useEffect(() => {
    if (!offcanvasOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") closeOffcanvas();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [offcanvasOpen, closeOffcanvas]);

  return (
    <>
      <Preloader />
      <div id="scroll-percentage">
        <span
          id="scroll-percentage-value"
          data-default-color="#0f3041"
          data-scroll-color="#53a3d6"
        />
      </div>
      <Header
        services={services}
        offcanvasOpen={offcanvasOpen}
        onToggleOffcanvas={toggleOffcanvas}
      />
      <OffCanvas open={offcanvasOpen} onClose={closeOffcanvas} />
      <main>{children}</main>
      <Footer services={services} />
      <FloatingCTA />
      <ClientPlugins />
    </>
  );
}
