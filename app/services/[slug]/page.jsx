import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/services/ServiceDetailView";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildMetadata,
  breadcrumbSchema,
  medicalServiceSchema,
} from "@/lib/seo";
import {
  getServiceBySlug,
  getRelatedServices,
  getServiceSlugs,
  getServices,
} from "@/lib/api/services";
import { getFaqs } from "@/lib/api";

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const service = await getServiceBySlug(params.slug);
  if (!service) return {};
  return buildMetadata({
    ...service.seo,
    path: `/services/${service.slug}/`,
    image: service.image,
  });
}

export default async function ServiceDetailPage({ params }) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  const [related, faqs, allServices] = await Promise.all([
    getRelatedServices(service.relatedSlugs || []),
    getFaqs(service.faqIds || []),
    getServices(),
  ]);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            {
              name: service.titleEn,
              path: `/services/${service.slug}/`,
            },
          ]),
          medicalServiceSchema(service),
        ]}
      />
      <ServiceDetailView
        service={service}
        related={related}
        faqs={faqs}
        allServices={allServices}
      />
    </>
  );
}
