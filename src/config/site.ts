export const siteConfig = {
  name: "Sapaio Integrated Facilities Management Private Limited",
  shortName: "SIF",
  description:
    "Integrated facility management shaped around each site's operations, with confirmed housekeeping, commercial cleaning and industrial cleaning capabilities.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sapaio.in",
  phone: "8446225973",
  phoneDisplay: "+91 84462 25973",
  email: "director.sapaio@gmail.com",
  address:
    "Flat No. 8, Raj Palace, Plot 12, Survey No. 10, Ashoka, Dwarka Corner, Nashik 422011, Maharashtra, India",
};

export const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "Sectors", href: "/industries", menu: "sectors" },
  { label: "Integrated Facility Management", href: "/services/integrated-facility-management", menu: "services" },
  { label: "About SIF", href: "/about" },
  { label: "Resources", href: "/our-approach", menu: "resources" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const resourceNavigation = [
  { label: "Our approach", href: "/our-approach", description: "How a requirement moves from assessment to review." },
  { label: "Quality, safety & sustainability", href: "/quality-safety-sustainability", description: "Responsible practices built into daily work." },
  { label: "Careers", href: "/careers", description: "Enquire about future operations and support opportunities." },
  { label: "Insights", href: "/insights", description: "A future home for approved facility-management guidance." },
] as const;
