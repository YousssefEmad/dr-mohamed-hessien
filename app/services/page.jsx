import ServicesListView from "@/components/services/ServicesListView";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getServices } from "@/lib/api/services";

export const metadata = buildMetadata({
  titleAr: "الخدمات الطبية | عيادات الدكتور محمد حسين",
  titleEn: "Medical Services | Dr. Mohamed Hessien Clinics",
  descriptionAr:
    "اكتشف خدمات جراحات الشبكية وزراعة القرنية وتصحيح الإبصار والمياه البيضاء وزراعة العدسات والحول وتجميل الجفون.",
  descriptionEn:
    "Explore retina, corneal transplant, LASIK, cataract, lens implant, strabismus and eyelid surgery services.",
  keywordsAr: ["خدمات طبية", "جراحات العيون"],
  keywordsEn: ["medical services", "eye surgery"],
  path: "/services/",
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services/" },
        ])}
      />
      <ServicesListView services={services} />
    </>
  );
}
