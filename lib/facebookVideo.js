/**
 * Facebook share short-links (/share/v/…, /share/r/…) do not work inside
 * plugins/video.php. Canonical /videos/… and /reel/… URLs do.
 */

export function normalizeFacebookUrl(url = "") {
  const cleaned = String(url || "").trim();
  if (!cleaned) return "";

  try {
    const parsed = new URL(cleaned);
    parsed.search = "";
    parsed.hash = "";
    let href = parsed.toString();
    if (!href.endsWith("/")) href += "/";
    return href;
  } catch (_) {
    return cleaned.split("?")[0];
  }
}

export function isFacebookShareUrl(url = "") {
  return /facebook\.com\/share\/[rv]\//i.test(String(url));
}

export function canEmbedFacebookVideo(url = "") {
  if (!url || isFacebookShareUrl(url)) return false;
  return /facebook\.com\/(reel\/|[^/]+\/videos\/|watch\/?)/i.test(url);
}

/**
 * Build Facebook plugin embed src from a canonical video/reel URL.
 */
export function getFacebookEmbedSrc(url = "") {
  const canonical = normalizeFacebookUrl(url);
  if (!canonical || !canEmbedFacebookVideo(canonical)) return "";

  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    canonical
  )}&show_text=false&width=560&height=315&t=0`;
}
