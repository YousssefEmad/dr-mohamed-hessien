import LegalPageView from "@/components/shared/LegalPageView";
import { buildMetadata } from "@/lib/seo";
import { getTermsPage } from "@/lib/api";

import { REVALIDATE_SECONDS } from "@/lib/sanity/revalidate";

export const revalidate = REVALIDATE_SECONDS;

export async function generateMetadata() {
  const page = await getTermsPage();
  return buildMetadata({ ...page.seo, path: "/terms/" });
}

export default async function TermsPage() {
  const page = await getTermsPage();
  return <LegalPageView page={page} />;
}
