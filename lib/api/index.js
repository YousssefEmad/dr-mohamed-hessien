import { navigation, footerQuickLinks, uiLabels } from "@/data/navigation";
import {
  getGalleryItems as sanityGalleryItems,
  getTestimonials as sanityTestimonials,
  getFaqs as sanityFaqs,
  getDoctor as sanityDoctor,
  getVideos as sanityVideos,
  getAboutPage as sanityAbout,
  getContactPage as sanityContact,
  getGalleryPage as sanityGalleryPage,
  getVideosPage as sanityVideosPage,
  getTestimonialsPage as sanityTestimonialsPage,
  getHomeSections as sanityHomeSections,
  getSiteConfig as sanitySiteConfig,
  getPrivacyPage as sanityPrivacy,
  getTermsPage as sanityTerms,
} from "@/lib/sanity/content";

export async function getGalleryItems() {
  return sanityGalleryItems();
}

export async function getGalleryPage() {
  return sanityGalleryPage();
}

export async function getTestimonials() {
  return sanityTestimonials();
}

export async function getTestimonialsPage() {
  return sanityTestimonialsPage();
}

export async function getFaqs(ids) {
  return sanityFaqs(ids);
}

export async function getDoctor() {
  return sanityDoctor();
}

export async function getContactPage() {
  return sanityContact();
}

export async function getVideos() {
  return sanityVideos();
}

export async function getVideosPage() {
  return sanityVideosPage();
}

export async function getAboutPage() {
  return sanityAbout();
}

export async function getPrivacyPage() {
  return sanityPrivacy();
}

export async function getTermsPage() {
  return sanityTerms();
}

export async function getHomeSections() {
  return sanityHomeSections();
}

export async function getSiteConfig() {
  return sanitySiteConfig();
}

export async function getNavigation() {
  return navigation;
}

export async function getFooterLinks() {
  return footerQuickLinks;
}

export async function getUiLabels() {
  return uiLabels;
}
