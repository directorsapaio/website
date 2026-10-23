import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { CallToAction } from "@/components/call-to-action";
import { componentServices, getActiveService } from "@/config/services";

export function generateStaticParams() { return componentServices.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = getActiveService((await params).slug);
  if (!service) return {};
  return { title: service.title, description: service.summary, alternates: { canonical: `/services/${service.slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getActiveService((await params).slug);
  if (!service) notFound();
  return (
    <>
      <PageHero section="Service" title={service.title} lead={service.introduction} image={service.image} imageAlt={service.imageAlt} breadcrumbs={[{ label: "Services", href: "/services" }, { label: service.shortTitle }]} />
      <section className="section">
        <div className="shell scope-grid">
          <div><p className="section-index">Typical scope</p><h2>Built from the facility outward.</h2><p>The items below are starting points for discussion. The final scope follows a site review and written agreement.</p></div>
          <ul className="scope-list">{service.scope.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" />{item}</li>)}</ul>
        </div>
      </section>
      <section className="section section--neutral">
        <div className="shell outcome-grid"><div><p className="section-index">Working principles</p><h2>What the service plan should make clear.</h2></div><div className="outcome-list">{service.outcomes.map((item, index) => <article key={item}><span>0{index + 1}</span><h3>{item}</h3></article>)}</div></div>
      </section>
      <section className="scope-note"><div className="shell"><strong>Important</strong><p>Availability, deployment, methods and timing depend on site assessment and commercial agreement. No specialist certification or regulated capability is implied.</p></div></section>
      <CallToAction title={`Discuss ${service.shortTitle.toLowerCase()} for your facility.`} />
    </>
  );
}
