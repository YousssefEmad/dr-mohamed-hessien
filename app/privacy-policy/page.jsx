import LegalPageView from "@/components/shared/LegalPageView";
import { buildMetadata } from "@/lib/seo";
import { getPrivacyPage } from "@/lib/api";

import { REVALIDATE_SECONDS } from "@/lib/sanity/revalidate";

export const revalidate = REVALIDATE_SECONDS;

export async function generateMetadata() {
  const page = await getPrivacyPage();
  return buildMetadata({ ...page.seo, path: "/privacy-policy/" });
}

export default async function PrivacyPolicyPage() {
  const page = await getPrivacyPage();
  return <LegalPageView page={page} />;
}
