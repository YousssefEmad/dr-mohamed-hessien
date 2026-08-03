import { galleryItems, galleryPage } from "@/data/gallery";
import { testimonials, testimonialsPage } from "@/data/testimonials";
import { faqs } from "@/data/faq";
import { doctor } from "@/data/doctor";
import { contactPage, videoItems, videosPage } from "@/data/contact";
import {
  aboutPage,
  privacyPage,
  termsPage,
  homeSections,
} from "@/data/pages";
import { siteConfig } from "@/data/site";
import { navigation, footerQuickLinks, uiLabels } from "@/data/navigation";

export async function getGalleryItems() {
  return galleryItems;
}

export async function getGalleryPage() {
  return galleryPage;
}

export async function getTestimonials() {
  return testimonials;
}

export async function getTestimonialsPage() {
  return testimonialsPage;
}

export async function getFaqs(ids) {
  if (!ids) return faqs;
  return faqs.filter((f) => ids.includes(f.id));
}

export async function getDoctor() {
  return doctor;
}

export async function getContactPage() {
  return contactPage;
}

export async function getVideos() {
  return videoItems;
}

export async function getVideosPage() {
  return videosPage;
}

export async function getAboutPage() {
  return aboutPage;
}

export async function getPrivacyPage() {
  return privacyPage;
}

export async function getTermsPage() {
  return termsPage;
}

export async function getHomeSections() {
  return homeSections;
}

export async function getSiteConfig() {
  return siteConfig;
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
