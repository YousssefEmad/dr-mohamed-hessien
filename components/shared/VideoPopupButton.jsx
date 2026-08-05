"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Build an in-page embed URL for Facebook videos / reels / share links.
 */
export function getFacebookEmbedSrc(url = "") {
  if (!url) return "";
  try {
    const cleaned = String(url).trim();
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
      cleaned
    )}&show_text=false&width=560&height=315&t=0`;
  } catch (_) {
    return "";
  }
}

/**
 * Opens a Facebook video in a popup embed — same share links, no page leave.
 */
export default function VideoPopupButton({
  url,
  title = "Video",
  label,
  className = "",
  variant = "card", // "card" | "button"
}) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const src = useMemo(() => getFacebookEmbedSrc(url), [url]);
  const watchLabel =
    label || (lang === "en" ? "Watch video" : "مشاهدة الفيديو");

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!url || !src) return null;

  return (
    <>
      {variant === "button" ? (
        <button
          type="button"
          className={`main-btn btn-filled video-popup-btn ${className}`.trim()}
          onClick={() => setOpen(true)}
        >
          <i className="fas fa-play" aria-hidden="true" />
          <span>{watchLabel}</span>
        </button>
      ) : (
        <button
          type="button"
          className={`video-thumb-card ${className}`.trim()}
          onClick={() => setOpen(true)}
          aria-label={watchLabel}
        >
          <span className="video-thumb-card__play">
            <i className="fas fa-play" aria-hidden="true" />
          </span>
          <span className="video-thumb-card__label">{watchLabel}</span>
        </button>
      )}

      {open ? (
        <div className="video-popup" role="dialog" aria-modal="true">
          <div
            className="video-popup__backdrop"
            onClick={() => setOpen(false)}
          />
          <div className="video-popup__dialog video-popup__dialog--embed">
            <button
              type="button"
              className="video-popup__close"
              onClick={() => setOpen(false)}
              aria-label={lang === "en" ? "Close video" : "إغلاق الفيديو"}
            >
              <i className="fal fa-times" />
            </button>
            <div className="video-popup__embed">
              <iframe
                src={src}
                title={title}
                width="560"
                height="315"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
            {title ? <p className="video-popup__title">{title}</p> : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
