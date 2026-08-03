import "@/styles/globals.css";
import Providers from "@/components/layout/Providers";
import SiteShell from "@/components/layout/SiteShell";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, organizationSchema, localBusinessSchema } from "@/lib/seo";
import { siteSeo } from "@/data/site";
import { getServices } from "@/lib/api/services";

export const metadata = buildMetadata({
  ...siteSeo,
  path: "/",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  shrinkToFit: "no",
};

export default async function RootLayout({ children }) {
  const services = await getServices();

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/img/logo.png" type="image/png" />
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
      <body className="lang-ar" suppressHydrationWarning>
        <JsonLd data={[organizationSchema(), localBusinessSchema()]} />
        <Providers>
          <SiteShell services={services}>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
