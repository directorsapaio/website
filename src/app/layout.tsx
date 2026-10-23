import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { assets } from "@/config/assets";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "SIF | Integrated Facility Management", template: "%s | SIF" },
  description: siteConfig.description,
  icons: assets.logo
    ? { icon: assets.logo }
    : { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>" },
  openGraph: {
    title: "Sapaio Integrated Facilities Management Private Limited",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "SIF",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/1.Homepage%20%26%20SIF%20Team/ChatGPT%20Image%20Oct%2022%2C%202026%2C%2005_32_44%20PM-1.png", width: 1672, height: 941, alt: "SIF facility services team" }],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  logo: new URL(assets.logo, siteConfig.url).toString(),
  description: siteConfig.description,
  telephone: siteConfig.phoneDisplay,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Flat No. 8, Raj Palace, Plot 12, Survey No. 10, Ashoka, Dwarka Corner",
    addressLocality: "Nashik",
    addressRegion: "Maharashtra",
    postalCode: "422011",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
