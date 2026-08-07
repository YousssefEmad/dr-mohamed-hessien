"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  canEmbedFacebookVideo,
  getFacebookEmbedSrc,
  isFacebookShareUrl,
  normalizeFacebookUrl,
} from "@/lib/facebookVideo";

/**
 * Opens a Facebook video in a popup embed.
 * Share short-links cannot be embedded — those open on Facebook instead.
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
  const [iframeFailed, setIframeFailed] = useState(false);

  const canonical = useMemo(() => normalizeFacebookUrl(url), [url]);
  const embedSrc = useMemo(() => getFacebookEmbedSrc(canonical), [canonical]);
  const isShareOnly = isFacebookShareUrl(url) || !canEmbedFacebookVideo(canonical);

  const watchLabel =
    label || (lang === "en" ? "Watch video" : "مشاهدة الفيديو");
  const openOnFbLabel =
    lang === "en" ? "Open on Facebook" : "فتح على فيسبوك";

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

  useEffect(() => {
    if (!open) setIframeFailed(false);
  }, [open]);

  if (!url) return null;

  const handleOpen = () => {
    // Share links cannot be embedded on static hosting — open Facebook directly.
    if (isShareOnly) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    setOpen(true);
  };

  return (
    <>
      {variant === "button" ? (
        <button
          type="button"
          className={`main-btn btn-filled video-popup-btn ${className}`.trim()}
          onClick={handleOpen}
        >
          <i className="fas fa-play" aria-hidden="true" />
          <span>{watchLabel}</span>
        </button>
      ) : (
        <button
          type="button"
          className={`video-thumb-card ${className}`.trim()}
          onClick={handleOpen}
          aria-label={watchLabel}
        >
          <span className="video-thumb-card__play">
            <i className="fas fa-play" aria-hidden="true" />
          </span>
          <span className="video-thumb-card__label">{watchLabel}</span>
        </button>
      )}

      {open && embedSrc ? (
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

            {!iframeFailed ? (
              <div className="video-popup__embed">
                <iframe
                  src={embedSrc}
                  title={title}
                  width="560"
                  height="315"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  onError={() => setIframeFailed(true)}
                />
              </div>
            ) : (
              <div className="video-popup__fallback">
                <p>
                  {lang === "en"
                    ? "This video could not be played here."
                    : "تعذر تشغيل الفيديو هنا."}
                </p>
                <a
                  href={canonical}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="main-btn btn-filled"
                >
                  {openOnFbLabel}
                </a>
              </div>
            )}

            <div className="video-popup__actions">
              {title ? <p className="video-popup__title">{title}</p> : null}
              <a
                href={canonical}
                target="_blank"
                rel="noopener noreferrer"
                className="video-popup__fb-link"
              >
                <i className="fab fa-facebook" aria-hidden="true" />
                <span>{openOnFbLabel}</span>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
