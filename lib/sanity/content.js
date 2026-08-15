import { doctor as localDoctor } from "@/data/doctor";
import { services as localServices } from "@/data/services";
import { blogPosts as localPosts } from "@/data/blog";
import { galleryItems as localGallery, galleryPage as localGalleryPage } from "@/data/gallery";
import { testimonials as localTestimonials, testimonialsPage as localTestimonialsPage } from "@/data/testimonials";
import { faqs as localFaqs } from "@/data/faq";
import { contactPage as localContact, videoItems as localVideos, videosPage as localVideosPage } from "@/data/contact";
import {
  aboutPage as localAbout,
  privacyPage as localPrivacy,
  termsPage as localTerms,
  homeSections as localHomeSections,
} from "@/data/pages";
import { siteConfig as localSite, siteSeo as localSeo } from "@/data/site";
import { client } from "./client";
import { urlForImage } from "./image";

function img(source, fallback) {
  return urlForImage(source) || fallback || "";
}

function strList(value, fallback = []) {
  return Array.isArray(value) && value.length ? value.filter(Boolean) : fallback;
}

function mapSeo(docSeo, fallback = {}) {
  if (!docSeo) return fallback;
  return {
    titleAr: docSeo.titleAr || fallback.titleAr || "",
    titleEn: docSeo.titleEn || fallback.titleEn || "",
    descriptionAr: docSeo.descriptionAr || fallback.descriptionAr || "",
    descriptionEn: docSeo.descriptionEn || fallback.descriptionEn || "",
    keywordsAr: strList(docSeo.keywordsAr, fallback.keywordsAr || []),
    keywordsEn: strList(docSeo.keywordsEn, fallback.keywordsEn || []),
  };
}

async function safeFetch(query, fallback) {
  try {
    const data = await client.fetch(query);
    return data;
  } catch (err) {
    console.warn("[sanity] fetch failed, using local data:", err.message);
    return fallback;
  }
}

export function mapSite(doc) {
  if (!doc) {
    return { ...localSite, seo: localSeo, homeSections: localHomeSections };
  }

  return {
    ...localSite,
    nameAr: doc.nameAr || localSite.nameAr,
    nameEn: doc.nameEn || localSite.nameEn,
    shortNameAr: doc.shortNameAr || localSite.shortNameAr,
    shortNameEn: doc.shortNameEn || localSite.shortNameEn,
    taglineAr: doc.taglineAr || localSite.taglineAr,
    taglineEn: doc.taglineEn || localSite.taglineEn,
    url: doc.url || localSite.url,
    logo: img(doc.logo, localSite.logo),
    phone: doc.phone || localSite.phone,
    phoneDisplay: doc.phoneDisplay || localSite.phoneDisplay,
    whatsapp: doc.whatsapp || localSite.whatsapp,
    email: doc.email || localSite.email,
    addressAr: doc.addressAr || localSite.addressAr,
    addressEn: doc.addressEn || localSite.addressEn,
    hoursAr: doc.hoursAr || localSite.hoursAr,
    hoursEn: doc.hoursEn || localSite.hoursEn,
    mapEmbed: doc.mapEmbed || localSite.mapEmbed,
    geo: {
      latitude: doc.geo?.latitude ?? localSite.geo.latitude,
      longitude: doc.geo?.longitude ?? localSite.geo.longitude,
    },
    social: {
      facebook: doc.social?.facebook ?? localSite.social.facebook,
      instagram: doc.social?.instagram ?? localSite.social.instagram,
      youtube: doc.social?.youtube ?? localSite.social.youtube,
      tiktok: doc.social?.tiktok ?? localSite.social.tiktok,
    },
    videoBanner: doc.videoBanner || localSite.videoBanner,
    doctorImage: img(doc.doctorImage, localSite.doctorImage),
    aboutImage: img(doc.aboutImage, localSite.aboutImage),
    breadcrumbBg: img(doc.breadcrumbBg, localSite.breadcrumbBg),
    defaultOgImage: img(doc.defaultOgImage, localSite.defaultOgImage),
    copyrightAr: doc.copyrightAr || localSite.copyrightAr,
    copyrightEn: doc.copyrightEn || localSite.copyrightEn,
    seo: mapSeo(doc.seo, localSeo),
    homeSections: {
      ...localHomeSections,
      ...(doc.homeSections || {}),
    },
    contactPage: {
      ...localContact,
      titleAr: doc.contactTitleAr || localContact.titleAr,
      titleEn: doc.contactTitleEn || localContact.titleEn,
      formTitleAr: doc.formTitleAr || localContact.formTitleAr,
      formTitleEn: doc.formTitleEn || localContact.formTitleEn,
      successAr: doc.formSuccessAr || localContact.successAr,
      successEn: doc.formSuccessEn || localContact.successEn,
      seo: mapSeo(doc.contactSeo, localContact.seo),
    },
    galleryPage: {
      ...localGalleryPage,
      titleAr: doc.galleryTitleAr || localGalleryPage.titleAr,
      titleEn: doc.galleryTitleEn || localGalleryPage.titleEn,
      subtitleAr: doc.gallerySubtitleAr || localGalleryPage.subtitleAr,
      subtitleEn: doc.gallerySubtitleEn || localGalleryPage.subtitleEn,
    },
    videosPage: {
      ...localVideosPage,
      titleAr: doc.videosTitleAr || localVideosPage.titleAr,
      titleEn: doc.videosTitleEn || localVideosPage.titleEn,
      subtitleAr: doc.videosSubtitleAr || localVideosPage.subtitleAr,
      subtitleEn: doc.videosSubtitleEn || localVideosPage.subtitleEn,
    },
    testimonialsPage: {
      ...localTestimonialsPage,
      titleAr: doc.testimonialsTitleAr || localTestimonialsPage.titleAr,
      titleEn: doc.testimonialsTitleEn || localTestimonialsPage.titleEn,
      subtitleAr: doc.testimonialsSubtitleAr || localTestimonialsPage.subtitleAr,
      subtitleEn: doc.testimonialsSubtitleEn || localTestimonialsPage.subtitleEn,
    },
  };
}

export async function getSiteConfig() {
  const doc = await safeFetch(`*[_id == "siteSettings"][0]`, null);
  return mapSite(doc);
}

function mapDoctor(doc) {
  if (!doc) return localDoctor;
  return {
    ...localDoctor,
    slug: doc.slug?.current || doc.slug || localDoctor.slug,
    nameAr: doc.nameAr || localDoctor.nameAr,
    nameEn: doc.nameEn || localDoctor.nameEn,
    titleAr: doc.titleAr || localDoctor.titleAr,
    titleEn: doc.titleEn || localDoctor.titleEn,
    image: img(doc.image, localDoctor.image),
    imageAlt: img(doc.imageAlt, localDoctor.imageAlt),
    bioAr: doc.bioAr || localDoctor.bioAr,
    bioEn: doc.bioEn || localDoctor.bioEn,
    credentialsAr: strList(doc.credentialsAr, localDoctor.credentialsAr),
    credentialsEn: strList(doc.credentialsEn, localDoctor.credentialsEn),
    seo: mapSeo(doc.seo, localDoctor.seo),
  };
}

export async function getDoctor() {
  const doc = await safeFetch(`*[_id == "doctorProfile"][0]`, null);
  return mapDoctor(doc);
}

function mapAbout(doc) {
  if (!doc) return localAbout;
  return {
    ...localAbout,
    titleAr: doc.titleAr || localAbout.titleAr,
    titleEn: doc.titleEn || localAbout.titleEn,
    headingAr: doc.headingAr || localAbout.headingAr,
    headingEn: doc.headingEn || localAbout.headingEn,
    introAr: doc.introAr || localAbout.introAr,
    introEn: doc.introEn || localAbout.introEn,
    doctorLeadAr: doc.doctorLeadAr || localAbout.doctorLeadAr,
    doctorLeadEn: doc.doctorLeadEn || localAbout.doctorLeadEn,
    commitmentAr: doc.commitmentAr || localAbout.commitmentAr,
    commitmentEn: doc.commitmentEn || localAbout.commitmentEn,
    fullTextAr: doc.fullTextAr || localAbout.fullTextAr,
    fullTextEn: doc.fullTextEn || localAbout.fullTextEn,
    missionTitleAr: doc.missionTitleAr || localAbout.missionTitleAr,
    missionTitleEn: doc.missionTitleEn || localAbout.missionTitleEn,
    missionAr: doc.missionAr || localAbout.missionAr,
    missionEn: doc.missionEn || localAbout.missionEn,
    visionTitleAr: doc.visionTitleAr || localAbout.visionTitleAr,
    visionTitleEn: doc.visionTitleEn || localAbout.visionTitleEn,
    visionAr: doc.visionAr || localAbout.visionAr,
    visionEn: doc.visionEn || localAbout.visionEn,
    goalsTitleAr: doc.goalsTitleAr || localAbout.goalsTitleAr,
    goalsTitleEn: doc.goalsTitleEn || localAbout.goalsTitleEn,
    goalsAr: strList(doc.goalsAr, localAbout.goalsAr),
    goalsEn: strList(doc.goalsEn, localAbout.goalsEn),
    whyTitleAr: doc.whyTitleAr || localAbout.whyTitleAr,
    whyTitleEn: doc.whyTitleEn || localAbout.whyTitleEn,
    whyAr: strList(doc.whyAr, localAbout.whyAr),
    whyEn: strList(doc.whyEn, localAbout.whyEn),
    expertiseTitleAr: doc.expertiseTitleAr || localAbout.expertiseTitleAr,
    expertiseTitleEn: doc.expertiseTitleEn || localAbout.expertiseTitleEn,
    expertiseHeadingAr: doc.expertiseHeadingAr || localAbout.expertiseHeadingAr,
    expertiseHeadingEn: doc.expertiseHeadingEn || localAbout.expertiseHeadingEn,
    expertiseTextAr: doc.expertiseTextAr || localAbout.expertiseTextAr,
    expertiseTextEn: doc.expertiseTextEn || localAbout.expertiseTextEn,
    careAreasTitleAr: doc.careAreasTitleAr || localAbout.careAreasTitleAr,
    careAreasTitleEn: doc.careAreasTitleEn || localAbout.careAreasTitleEn,
    image: img(doc.image, localAbout.image),
    patternImage: img(doc.patternImage, localAbout.patternImage),
    seo: mapSeo(doc.seo, localAbout.seo),
  };
}

export async function getAboutPage() {
  const doc = await safeFetch(`*[_id == "aboutPage"][0]`, null);
  return mapAbout(doc);
}

function mapService(doc) {
  const slug = doc.slug?.current || doc.slug || "";
  const local = localServices.find((s) => s.slug === slug) || {};
  return {
    ...local,
    id: doc.legacyId || local.id || slug,
    slug,
    order: doc.order ?? local.order ?? 0,
    titleAr: doc.titleAr || local.titleAr || "",
    titleEn: doc.titleEn || local.titleEn || "",
    shortDescriptionAr: doc.shortDescriptionAr || local.shortDescriptionAr || "",
    shortDescriptionEn: doc.shortDescriptionEn || local.shortDescriptionEn || "",
    descriptionAr: doc.descriptionAr || local.descriptionAr || "",
    descriptionEn: doc.descriptionEn || local.descriptionEn || "",
    heroAr: doc.heroAr || local.heroAr || "",
    heroEn: doc.heroEn || local.heroEn || "",
    image: img(doc.image, local.image || "/img/service-retina-surgery.jpg"),
    icon: doc.icon || local.icon || "fal fa-eye",
    gallery: doc.gallery?.length
      ? doc.gallery.map((g, i) => img(g, local.gallery?.[i] || local.image))
      : local.gallery || [],
    highlightsAr: strList(doc.highlightsAr, local.highlightsAr || []),
    highlightsEn: strList(doc.highlightsEn, local.highlightsEn || []),
    whyChooseAr: strList(doc.whyChooseAr, local.whyChooseAr || []),
    whyChooseEn: strList(doc.whyChooseEn, local.whyChooseEn || []),
    videos: strList(doc.videos, local.videos || []),
    faqIds: strList(doc.faqIds, local.faqIds || []),
    relatedSlugs: strList(doc.relatedSlugs, local.relatedSlugs || []),
    sections: doc.sections?.length ? doc.sections : local.sections,
    ctaAr: doc.ctaAr || local.ctaAr,
    ctaEn: doc.ctaEn || local.ctaEn,
    seo: mapSeo(doc.seo, local.seo || {}),
  };
}

export async function getServices() {
  const docs = await safeFetch(
    `*[_type == "service"]|order(order asc){
      legacyId, titleAr, titleEn, slug, order, image, icon,
      shortDescriptionAr, shortDescriptionEn,
      descriptionAr, descriptionEn, heroAr, heroEn,
      gallery, highlightsAr, highlightsEn, whyChooseAr, whyChooseEn,
      videos, faqIds, relatedSlugs, sections, ctaAr, ctaEn, seo
    }`,
    null
  );
  if (!docs?.length) return [...localServices].sort((a, b) => a.order - b.order);
  return docs.map(mapService);
}

export async function getServiceBySlug(slug) {
  const list = await getServices();
  const decoded = decodeURIComponent(slug || "");
  return list.find((s) => s.slug === slug || s.slug === decoded) || null;
}

function mapPost(doc) {
  const slug = doc.slug?.current || doc.slug || "";
  const local = localPosts.find((p) => p.slug === slug) || {};
  const date = doc.date || local.date || "";
  return {
    ...local,
    id: doc.legacyId || local.id || slug,
    slug,
    titleAr: doc.titleAr || local.titleAr || "",
    titleEn: doc.titleEn || local.titleEn || "",
    excerptAr: doc.excerptAr || local.excerptAr || "",
    excerptEn: doc.excerptEn || local.excerptEn || "",
    contentAr: doc.contentAr || local.contentAr || "",
    contentEn: doc.contentEn || local.contentEn || "",
    image: img(doc.image, local.image || "/img/blog-1.jpg"),
    date,
    dateDisplayAr: doc.dateDisplayAr || local.dateDisplayAr || "",
    dateDisplayEn: doc.dateDisplayEn || local.dateDisplayEn || "",
    categoryAr: doc.categoryAr || local.categoryAr || "",
    categoryEn: doc.categoryEn || local.categoryEn || "",
    authorAr: doc.authorAr || local.authorAr || "",
    authorEn: doc.authorEn || local.authorEn || "",
    relatedSlugs: strList(doc.relatedSlugs, local.relatedSlugs || []),
    seo: mapSeo(doc.seo, local.seo || {}),
  };
}

export async function getPosts() {
  const docs = await safeFetch(
    `*[_type == "post"]|order(date desc){
      legacyId, titleAr, titleEn, slug, excerptAr, excerptEn,
      contentAr, contentEn, image, date, dateDisplayAr, dateDisplayEn,
      categoryAr, categoryEn, authorAr, authorEn, relatedSlugs, seo
    }`,
    null
  );
  if (!docs?.length) {
    return [...localPosts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  return docs.map(mapPost);
}

export async function getPostBySlug(slug) {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function getGalleryItems() {
  const docs = await safeFetch(
    `*[_type == "galleryImage"]|order(order asc){_id, titleAr, titleEn, captionAr, captionEn, category, image, order}`,
    null
  );
  if (!docs?.length) return localGallery;
  return docs.map((doc, i) => {
    const local = localGallery[i] || {};
    return {
      id: doc._id || local.id || String(i + 1),
      image: img(doc.image, local.image || "/img/cases-1.jpeg"),
      titleAr: doc.titleAr || local.titleAr || "",
      titleEn: doc.titleEn || local.titleEn || "",
      captionAr: doc.captionAr || local.captionAr || "",
      captionEn: doc.captionEn || local.captionEn || "",
      category: doc.category || local.category || "cases",
    };
  });
}

export async function getVideos() {
  const docs = await safeFetch(
    `*[_type == "video"]|order(order asc){titleAr, titleEn, url, serviceSlug, order}`,
    null
  );
  if (!docs?.length) return localVideos;
  return docs.map((doc, i) => ({
    id: String(i + 1),
    titleAr: doc.titleAr || "",
    titleEn: doc.titleEn || "",
    url: doc.url || "",
    serviceSlug: doc.serviceSlug || "",
  }));
}

export async function getTestimonials() {
  const docs = await safeFetch(
    `*[_type == "testimonial"]|order(order asc){nameAr, nameEn, image, order}`,
    null
  );
  if (!docs?.length) return localTestimonials;
  return docs.map((doc, i) => ({
    id: String(i + 1),
    image: img(doc.image, localTestimonials[i]?.image || "/img/review-1.jpeg"),
    nameAr: doc.nameAr || localTestimonials[i]?.nameAr || "",
    nameEn: doc.nameEn || localTestimonials[i]?.nameEn || "",
  }));
}

export async function getFaqs(ids) {
  const docs = await safeFetch(
    `*[_type == "faq"]|order(order asc){key, questionAr, questionEn, answerAr, answerEn, order}`,
    null
  );
  const list = docs?.length
    ? docs.map((doc) => ({
        id: doc.key || "",
        questionAr: doc.questionAr || "",
        questionEn: doc.questionEn || "",
        answerAr: doc.answerAr || "",
        answerEn: doc.answerEn || "",
      }))
    : localFaqs;
  if (!ids) return list;
  return list.filter((f) => ids.includes(f.id));
}

export async function getContactPage() {
  const site = await getSiteConfig();
  return site.contactPage || localContact;
}

export async function getGalleryPage() {
  const site = await getSiteConfig();
  return site.galleryPage || localGalleryPage;
}

export async function getVideosPage() {
  const site = await getSiteConfig();
  return site.videosPage || localVideosPage;
}

export async function getTestimonialsPage() {
  const site = await getSiteConfig();
  return site.testimonialsPage || localTestimonialsPage;
}

export async function getHomeSections() {
  const site = await getSiteConfig();
  return site.homeSections || localHomeSections;
}

export async function getPrivacyPage() {
  return localPrivacy;
}

export async function getTermsPage() {
  return localTerms;
}
