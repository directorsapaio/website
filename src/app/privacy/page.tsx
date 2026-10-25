import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Privacy Policy", description: "Privacy information for the SIF website." };

export default function PrivacyPage() {
  return <section className="legal-page section"><div className="shell legal-shell"><Breadcrumbs items={[{ label: "Privacy" }]} /><h1>Privacy policy</h1><p className="lead">How information submitted through this website is handled.</p><h2>Information you provide</h2><p>When you contact SIF, you may provide your name, organisation, work contact details, location and information about your facility requirement. Please do not submit sensitive personal identity, financial or health information.</p><h2>How it may be used</h2><p>Information is used to respond to your enquiry, understand a potential requirement and maintain relevant business correspondence. SIF does not state that website enquiries are used for automated profiling.</p><h2>Website delivery and enquiries</h2><p>Standard technical information may be processed by the website hosting provider to deliver and secure the site. Enquiry details submitted through the form are transmitted through SIF&apos;s configured email-delivery provider so they can be delivered to SIF. Any future analytics or cookies should be disclosed here before being enabled.</p><h2>Contact</h2><p>For a privacy question or a request concerning information you submitted, email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p><p className="legal-updated">Last updated: 25 October 2026</p></div></section>;
}
