"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OffCanvas from "@/components/layout/OffCanvas";
import Preloader from "@/components/layout/Preloader";
import ClientPlugins from "@/components/layout/ClientPlugins";

export default function SiteShell({ children, services = [] }) {
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
      <Header services={services} />
      <OffCanvas />
      <main>{children}</main>
      <Footer services={services} />
      <ClientPlugins />
    </>
  );
}
