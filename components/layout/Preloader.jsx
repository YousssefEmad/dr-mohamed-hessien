"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Fast hide for Next.js — no long artificial delay
    const hide = () => setHidden(true);

    if (document.readyState === "complete") {
      const t = setTimeout(hide, 80);
      return () => clearTimeout(t);
    }

    window.addEventListener("load", hide, { once: true });
    const fallback = setTimeout(hide, 200);
    return () => {
      window.removeEventListener("load", hide);
      clearTimeout(fallback);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className="preloader">
      <Image
        className="logo-preloder"
        src="/img/logo.png"
        alt="Logo"
        width={80}
        height={80}
        priority
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/preloader.svg" alt="" width={48} height={48} />
    </div>
  );
}
