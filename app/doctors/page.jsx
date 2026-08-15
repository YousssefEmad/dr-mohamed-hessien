import DoctorPageView from "@/components/shared/DoctorPageView";
import { buildMetadata } from "@/lib/seo";
import { getDoctor } from "@/lib/api";

import { REVALIDATE_SECONDS } from "@/lib/sanity/revalidate";

export const revalidate = REVALIDATE_SECONDS;

export async function generateMetadata() {
  const doctor = await getDoctor();
  return buildMetadata({ ...doctor.seo, path: "/doctors/", image: doctor.image });
}

export default async function DoctorsPage() {
  const doctor = await getDoctor();
  return <DoctorPageView doctor={doctor} />;
}
