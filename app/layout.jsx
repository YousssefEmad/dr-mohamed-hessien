import { Cairo } from "next/font/google";
import "@/styles/globals.css";
import Providers from "@/components/layout/Providers";
import SiteShell from "@/components/layout/SiteShell";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, organizationSchema, localBusinessSchema } from "@/lib/seo";
import { siteSeo } from "@/data/site";
import { getServices } from "@/lib/api/services";
import { getAboutPage, getSiteConfig } from "@/lib/api";
import { REVALIDATE_SECONDS } from "@/lib/sanity/revalidate";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-cairo",
  fallback: ["Tahoma", "Arial", "sans-serif"],
});

export const revalidate = REVALIDATE_SECONDS;

export async function generateMetadata() {
  const site = await getSiteConfig();
  return buildMetadata({ ...(site.seo || siteSeo), path: "/" }, site);
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  shrinkToFit: "no",
};

export default async function RootLayout({ children }) {
  const [services, siteConfig, aboutPage] = await Promise.all([
    getServices(),
    getSiteConfig(),
    getAboutPage(),
  ]);

  return (
    <html
      lang="ar"
      dir="rtl"
      className={cairo.variable}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/img/logo.png" type="image/png" />
        {/* Fallback Cairo for legacy CSS — next/font is primary */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.css"
        />
        <link rel="stylesheet" href="/css/animate.min.css" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/css/flaticon.css" />
        <link rel="stylesheet" href="/fonts/flaticon/flaticon-2.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/css/slick.css" />
        <link rel="stylesheet" href="/css/nice-select.css" />
        <link rel="stylesheet" href="/css/default.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/lang.css" />
      </head>
      <body className={`lang-ar ${cairo.className}`} suppressHydrationWarning>
        <JsonLd data={[organizationSchema(siteConfig), localBusinessSchema(siteConfig)]} />
        <Providers siteConfig={siteConfig} aboutPage={aboutPage}>
          <SiteShell services={services}>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
