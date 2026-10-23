import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { assets } from "@/config/assets";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Careers", description: "Enquire about future housekeeping, cleaning and site-supervision opportunities with SIF." };

export default function CareersPage() {
  return (
    <>
      <PageHero section="Careers" title="Good facility work depends on people who take the details seriously." lead="SIF welcomes enquiries from people interested in housekeeping, cleaning and site-coordination work. We do not currently publish live vacancies on this website." image={assets.workforce.team} imageAlt="Professional housekeeping team ready for work" breadcrumbs={[{ label: "Careers" }]} />
      <section className="section"><div className="shell careers-grid"><div><p className="section-index">Types of work</p><h2>Register an interest in future opportunities.</h2><p>Depending on business needs and confirmed projects, opportunities may arise in cleaning, housekeeping and site supervision. Role, location, shift, eligibility and terms are shared only when a genuine opening is available.</p></div><div className="career-roles"><article><h3>Housekeeping & cleaning</h3><p>Routine and periodic facility cleaning roles across agreed work areas.</p></article><article><h3>Site supervision</h3><p>Task allocation, team coordination, work checks and issue escalation.</p></article><article><h3>Operations coordination</h3><p>Support for mobilisation, attendance, reporting and site communication where required.</p></article></div></div></section>
      <section className="section section--neutral"><div className="shell image-story image-story--reverse"><figure><Image src={assets.workforce.support} alt="Facility support personnel in a professional work setting" fill quality={90} sizes="(max-width: 850px) 100vw, 52vw" /></figure><div><p className="section-index">How to enquire</p><h2>Send a brief introduction.</h2><p>Email your name, city, preferred work type and relevant experience. Do not send government identification, bank information or other sensitive documents with an initial enquiry.</p><a className="button" href={`mailto:${siteConfig.email}?subject=Career enquiry - SIF`}>Email a career enquiry <ArrowRight /></a><p className="fine-print">SIF does not charge applicants a fee to submit an enquiry through this website.</p></div></div></section>
      <section className="cta-band"><div className="shell cta-band__inner"><div><h2>Have a general question?</h2><p>Use the contact page for company and service enquiries.</p></div><Link className="button button--light" href="/contact">Contact SIF <ArrowRight /></Link></div></section>
    </>
  );
}
