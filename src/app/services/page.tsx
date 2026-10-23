import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CallToAction } from "@/components/call-to-action";
import { PageHero } from "@/components/page-hero";
import { assets } from "@/config/assets";
import { componentServices, flagshipService } from "@/config/services";
import { publicCapabilities } from "@/config/capabilities";

export const metadata: Metadata = { title: "Integrated Facility Management & Services", description: "Explore SIF's integrated facility-management proposition, confirmed cleaning services and scope-dependent facility workstreams." };

export default function ServicesPage() {
  const conditional = publicCapabilities.filter((item) => item.publicDisplay === "contextual");
  return (
    <>
      <PageHero section="Capabilities" title="One facility. One clearly coordinated operating scope." lead="SIF's service architecture starts with integrated facility management: understand the environment, define responsibility, coordinate available workstreams and review delivery. Housekeeping and cleaning are the confirmed core components." image={assets.workforce.hero} imageAlt="Professional facility-services team prepared for site operations" breadcrumbs={[{ label: "Services" }]} />

      <section className="section service-flagship"><div className="shell service-flagship__grid">
        <figure><Image src={flagshipService.image} alt={flagshipService.imageAlt} fill quality={90} sizes="(max-width: 850px) 100vw, 48vw" /></figure>
        <div><p className="section-index">Flagship proposition</p><h2>{flagshipService.title}</h2><p>{flagshipService.introduction}</p><ul>{flagshipService.scope.map((item) => <li key={item}>{item}</li>)}</ul><Link className="button" href={`/services/${flagshipService.slug}`}>Explore the IFM model <ArrowRight aria-hidden="true" /></Link></div>
      </div></section>

      <section className="section section--neutral"><div className="shell">
        <div className="section-heading split-heading"><div><p className="section-index">Confirmed service components</p><h2>Cleaning capabilities within a wider operating plan.</h2></div><p>These services may be commissioned as focused requirements or coordinated as part of an approved IFM scope.</p></div>
        <div className="service-showcase">{componentServices.map((service, index) => <article key={service.slug} className="service-feature"><figure><Image src={service.image} alt={service.imageAlt} fill quality={90} sizes="(max-width: 800px) 100vw, 44vw" /></figure><div><span>0{index + 1} / Confirmed</span><h2>{service.title}</h2><p>{service.introduction}</p><Link className="text-link" href={`/services/${service.slug}`}>Review component scope <ArrowRight aria-hidden="true" /></Link></div></article>)}</div>
      </div></section>

      <section className="section capability-preview"><div className="shell capability-preview__grid"><div><p className="section-index">Scope-dependent workstreams</p><h2>Discussed carefully. Never assumed.</h2><p>Some building, workplace and site-upkeep workstreams may be relevant to an integrated brief but are not presented as standard active services.</p><Link className="text-link" href="/contact#enquiry">Ask about a specific requirement <ArrowRight aria-hidden="true" /></Link></div><div>{conditional.map((item) => <article key={item.id}><strong>{item.title}</strong><span>Confirmation required</span><p>{item.summary}</p></article>)}</div></div></section>

      <section className="scope-note"><div className="shell"><strong>Public capability rule</strong><p>Security services are not offered. Technical, specialist, regulated or partner-delivered activity is included only after competence, responsibility, approvals and the delivery arrangement are verified in writing.</p></div></section>
      <CallToAction title="Start with the operation, then define the services." copy="Share the facility, work areas, operating windows and priorities. SIF can help structure the right scope discussion." />
    </>
  );
}
