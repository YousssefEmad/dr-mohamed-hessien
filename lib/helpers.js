/**
 * Pick bilingual field: titleAr/titleEn or nested seo fields.
 */
export function pickLocalized(item, field, lang = "ar") {
  if (!item) return "";
  const arKey = `${field}Ar`;
  const enKey = `${field}En`;
  if (lang === "en") {
    return item[enKey] ?? item[arKey] ?? item[field] ?? "";
  }
  return item[arKey] ?? item[enKey] ?? item[field] ?? "";
}

export function t(labels, key, lang = "ar") {
  if (!labels) return "";
  const arKey = `${key}Ar`;
  const enKey = `${key}En`;
  if (lang === "en") return labels[enKey] ?? labels[arKey] ?? labels[key] ?? "";
  return labels[arKey] ?? labels[enKey] ?? labels[key] ?? "";
}

export function getDir(lang) {
  return lang === "ar" ? "rtl" : "ltr";
}

export function absoluteUrl(path = "", baseUrl) {
  const base = (baseUrl || "").replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

/** Decode slug from URL (handles Arabic / percent-encoded params). */
export function normalizeSlug(slug = "") {
  try {
    return decodeURIComponent(String(slug));
  } catch (_) {
    return String(slug);
  }
}

/**
 * Encode Unicode slug for Next.js static export generateStaticParams / links.
 * Leaves ASCII hyphens readable; encodes Arabic letters.
 */
export function encodeSlug(slug = "") {
  return encodeURIComponent(normalizeSlug(slug));
}

/** Blog detail path */
export function blogPath(slug) {
  return `/blog/${normalizeSlug(slug)}/`;
}

