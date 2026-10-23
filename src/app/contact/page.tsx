import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EnquiryForm } from "@/components/enquiry-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Contact SIF", description: "Contact SIF to discuss housekeeping, commercial cleaning or industrial cleaning requirements." };

export default function ContactPage() {
  return (
    <><section className="contact-hero"><div className="shell"><Breadcrumbs items={[{ label: "Contact" }]} /><p className="section-label section-label--light">Contact SIF</p><h1>Start with the facility.<br />We’ll discuss the work.</h1><p>Share the operating context and priorities. A clear requirement is the best starting point for a useful proposal.</p></div></section><section className="section"><div className="shell contact-grid"><aside className="contact-details"><p className="section-index">Direct contact</p><h2>Speak with SIF.</h2><a href={`tel:+91${siteConfig.phone}`}><Phone /><span><small>Phone</small>{siteConfig.phoneDisplay}</span></a><a href={`mailto:${siteConfig.email}`}><Mail /><span><small>Email</small>{siteConfig.email}</span></a><div><MapPin /><span><small>Registered office</small>{siteConfig.address}</span></div><p className="contact-note">For career enquiries, please use the guidance on our <a href="/careers">careers page</a>.</p></aside><div id="enquiry" className="enquiry-panel"><p className="section-index">Request a proposal</p><h2>Tell us what the site needs.</h2><EnquiryForm /></div></div></section></>
  );
}
