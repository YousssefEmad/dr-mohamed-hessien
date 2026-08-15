import {getCliClient} from 'sanity/cli'
import {siteConfig, siteSeo} from '../data/site.js'
import {doctor} from '../data/doctor.js'
import {aboutPage, homeSections} from '../data/pages.js'
import {services} from '../data/services.js'
import {blogPosts} from '../data/blog.js'
import {galleryItems} from '../data/gallery.js'
import {contactPage, videoItems} from '../data/contact.js'
import {testimonials} from '../data/testimonials.js'
import {faqs} from '../data/faq.js'

const client = getCliClient({apiVersion: '2026-08-15'})

function slug(current: string) {
  return {_type: 'slug', current}
}

function optionalUrl(value?: string) {
  return value && /^https?:\/\//.test(value) ? value : undefined
}

async function run() {
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    nameAr: siteConfig.nameAr,
    nameEn: siteConfig.nameEn,
    shortNameAr: siteConfig.shortNameAr,
    shortNameEn: siteConfig.shortNameEn,
    taglineAr: siteConfig.taglineAr,
    taglineEn: siteConfig.taglineEn,
    url: siteConfig.url,
    videoBanner: siteConfig.videoBanner,
    copyrightAr: siteConfig.copyrightAr,
    copyrightEn: siteConfig.copyrightEn,
    phone: siteConfig.phone,
    phoneDisplay: siteConfig.phoneDisplay,
    whatsapp: siteConfig.whatsapp,
    email: siteConfig.email,
    addressAr: siteConfig.addressAr,
    addressEn: siteConfig.addressEn,
    hoursAr: siteConfig.hoursAr,
    hoursEn: siteConfig.hoursEn,
    mapEmbed: optionalUrl(siteConfig.mapEmbed),
    geo: siteConfig.geo,
    contactTitleAr: contactPage.titleAr,
    contactTitleEn: contactPage.titleEn,
    formTitleAr: contactPage.formTitleAr,
    formTitleEn: contactPage.formTitleEn,
    formSuccessAr: contactPage.successAr,
    formSuccessEn: contactPage.successEn,
    social: {
      facebook: optionalUrl(siteConfig.social.facebook),
      instagram: optionalUrl(siteConfig.social.instagram),
      youtube: optionalUrl(siteConfig.social.youtube),
      tiktok: optionalUrl(siteConfig.social.tiktok),
    },
    homeSections,
    seo: siteSeo,
  })

  await client.createOrReplace({
    _id: 'doctorProfile',
    _type: 'doctorProfile',
    nameAr: doctor.nameAr,
    nameEn: doctor.nameEn,
    titleAr: doctor.titleAr,
    titleEn: doctor.titleEn,
    slug: slug(doctor.slug),
    bioAr: doctor.bioAr,
    bioEn: doctor.bioEn,
    credentialsAr: doctor.credentialsAr,
    credentialsEn: doctor.credentialsEn,
    seo: doctor.seo,
  })

  const {seo, image, patternImage, ...aboutRest} = aboutPage
  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    ...aboutRest,
    seo,
  })

  for (const item of services) {
    await client.createOrReplace({
      _id: `service-${item.slug}`,
      _type: 'service',
      legacyId: item.id,
      titleAr: item.titleAr,
      titleEn: item.titleEn,
      slug: slug(item.slug),
      order: item.order,
      icon: item.icon,
      shortDescriptionAr: item.shortDescriptionAr,
      shortDescriptionEn: item.shortDescriptionEn,
      descriptionAr: item.descriptionAr,
      descriptionEn: item.descriptionEn,
      heroAr: item.heroAr,
      heroEn: item.heroEn,
      highlightsAr: item.highlightsAr,
      highlightsEn: item.highlightsEn,
      whyChooseAr: item.whyChooseAr,
      whyChooseEn: item.whyChooseEn,
      sections: item.sections || [],
      ctaAr: item.ctaAr,
      ctaEn: item.ctaEn,
      videos: item.videos || [],
      faqIds: item.faqIds || [],
      relatedSlugs: item.relatedSlugs || [],
      seo: item.seo,
    })
  }

  for (const item of blogPosts) {
    await client.createOrReplace({
      _id: `post-${item.slug}`,
      _type: 'post',
      legacyId: item.id,
      titleAr: item.titleAr,
      titleEn: item.titleEn,
      slug: slug(item.slug),
      excerptAr: item.excerptAr,
      excerptEn: item.excerptEn,
      contentAr: item.contentAr,
      contentEn: item.contentEn,
      date: item.date,
      dateDisplayAr: item.dateDisplayAr,
      dateDisplayEn: item.dateDisplayEn,
      categoryAr: item.categoryAr,
      categoryEn: item.categoryEn,
      authorAr: item.authorAr,
      authorEn: item.authorEn,
      relatedSlugs: item.relatedSlugs || [],
      seo: item.seo,
    })
  }

  for (const [index, item] of galleryItems.entries()) {
    await client.createOrReplace({
      _id: `gallery-${item.id}`,
      _type: 'galleryImage',
      titleAr: item.titleAr,
      titleEn: item.titleEn,
      captionAr: item.captionAr,
      captionEn: item.captionEn,
      category: item.category,
      order: index + 1,
    })
  }

  for (const [index, item] of videoItems.entries()) {
    await client.createOrReplace({
      _id: `video-${item.id}`,
      _type: 'video',
      titleAr: item.titleAr,
      titleEn: item.titleEn,
      url: item.url,
      serviceSlug: item.serviceSlug,
      order: index + 1,
    })
  }

  for (const [index, item] of testimonials.entries()) {
    await client.createOrReplace({
      _id: `testimonial-${item.id}`,
      _type: 'testimonial',
      nameAr: item.nameAr,
      nameEn: item.nameEn,
      order: index + 1,
    })
  }

  for (const [index, item] of faqs.entries()) {
    await client.createOrReplace({
      _id: `faq-${item.id}`,
      _type: 'faq',
      key: item.id,
      questionAr: item.questionAr,
      questionEn: item.questionEn,
      answerAr: item.answerAr,
      answerEn: item.answerEn,
      order: index + 1,
    })
  }

  console.log('Seed complete for dr-mohamed-hessien (ftar3gpm). Upload images from the Studio.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
