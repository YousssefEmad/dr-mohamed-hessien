import { siteConfig as localSite, siteSeo as localSeo } from "@/data/site";
import { absoluteUrl } from "@/lib/helpers";

const DEFAULT_ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
  },
};

function resolveSite(site) {
  return site || localSite;
}

/**
 * Build Next.js Metadata from bilingual SEO object.
 */
export function buildMetadata(
  {
    titleAr,
    titleEn,
    descriptionAr,
    descriptionEn,
    keywordsAr = [],
    keywordsEn = [],
    path = "/",
    image,
    noIndex = false,
  } = {},
  site
) {
  const siteConfig = resolveSite(site);
  const seo = siteConfig.seo || localSeo;
  const title = titleAr || seo.titleAr;
  const description = descriptionAr || seo.descriptionAr;
  const keywords = [...(keywordsAr || []), ...(keywordsEn || [])];
  const canonical = absoluteUrl(path, siteConfig.url);
  const ogImage = image || siteConfig.defaultOgImage;
  const ogImageAbs = ogImage.startsWith("http")
    ? ogImage
    : absoluteUrl(ogImage, siteConfig.url);

  return {
    title,
    description,
    keywords,
    authors: [{ name: siteConfig.nameEn }],
    creator: siteConfig.nameEn,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical,
      languages: {
        "ar-EG": canonical,
        en: absoluteUrl(path, siteConfig.url),
        "x-default": canonical,
      },
    },
    robots: noIndex ? { index: false, follow: false } : DEFAULT_ROBOTS,
    openGraph: {
      type: "website",
      locale: "ar_EG",
      alternateLocale: ["en_US"],
      url: canonical,
      siteName: siteConfig.nameEn,
      title,
      description,
      images: [
        {
          url: ogImageAbs,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageAbs],
    },
  };
}

export function organizationSchema(site) {
  const siteConfig = resolveSite(site);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.nameEn,
    alternateName: siteConfig.nameAr,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo, siteConfig.url),
    image: absoluteUrl(siteConfig.logo, siteConfig.url),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressEn,
      addressLocality: "Giza",
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: Object.values(siteConfig.social || {}).filter(Boolean),
    medicalSpecialty: "Ophthalmology",
  };
}

export function localBusinessSchema(site) {
  const siteConfig = resolveSite(site);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.nameAr,
    image: absoluteUrl(siteConfig.logo, siteConfig.url),
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressAr,
      addressLocality: "الجيزة",
      addressCountry: "EG",
    },
    url: siteConfig.url,
    priceRange: "$$",
  };
}

export function breadcrumbSchema(items = [], site) {
  const siteConfig = resolveSite(site);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, siteConfig.url),
    })),
  };
}

export function articleSchema(post, site) {
  if (!post) return null;
  const siteConfig = resolveSite(site);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.titleAr,
    alternativeHeadline: post.titleEn,
    image: absoluteUrl(post.image, siteConfig.url),
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.authorEn || siteConfig.nameEn,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.nameEn,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.logo, siteConfig.url),
      },
    },
    description: post.excerptAr,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}/`, siteConfig.url),
    inLanguage: ["ar", "en"],
  };
}

export function medicalServiceSchema(service, site) {
  if (!service) return null;
  const siteConfig = resolveSite(site);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.titleEn,
    alternateName: service.titleAr,
    description: service.shortDescriptionEn || service.descriptionEn,
    url: absoluteUrl(`/services/${service.slug}/`, siteConfig.url),
    image: absoluteUrl(service.image, siteConfig.url),
    provider: {
      "@type": "MedicalBusiness",
      name: siteConfig.nameEn,
      url: siteConfig.url,
    },
  };
}
