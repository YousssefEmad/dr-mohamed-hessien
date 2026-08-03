import AboutPageView from "@/components/about/AboutPageView";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getAboutPage } from "@/lib/api";
import { getServices } from "@/lib/api/services";

export async function generateMetadata() {
  const about = await getAboutPage();
  return buildMetadata({ ...about.seo, path: "/about/" });
}

export default async function AboutPage() {
  const [about, services] = await Promise.all([getAboutPage(), getServices()]);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: about.titleEn, path: "/about/" },
        ])}
      />
      <AboutPageView about={about} services={services} />
    </>
  );
}
