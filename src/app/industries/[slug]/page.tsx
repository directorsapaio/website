import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { CallToAction } from "@/components/call-to-action";
import { getIndustry, industries } from "@/config/industries";
import { getIndustryProfile } from "@/config/industry-profiles";

export function generateStaticParams() { return industries.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const industry = getIndustry((await params).slug);
  if (!industry) return {};
  return { title: `${industry.title} Facility Management`, description: industry.summary, alternates: { canonical: `/industries/${industry.slug}` } };
}

const layoutLabels = {
  flow: "Movement & service flow",
  protocol: "Area & protocol map",
  occupancy: "Occupancy rhythm",
  control: "Operational control boundary",
  experience: "Visitor & community experience",
} as const;

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const industry = getIndustry(slug);
  const profile = getIndustryProfile(slug);
  if (!industry || !profile) notFound();

  const related = profile.related.map(getIndustry).filter((item): item is NonNullable<typeof item> => Boolean(item));
  return (
    <>
      <PageHero section={industry.family} title={`${industry.title}: facility support shaped by the operating environment.`} lead={industry.introduction} image={industry.image} imageAlt={industry.imageAlt} breadcrumbs={[{ label: "Industries", href: "/industries" }, { label: industry.title }]} />

      <section className={`section sector-blueprint sector-blueprint--${profile.layout}`}>
        <div className="shell">
          <div className="sector-blueprint__heading"><div><p className="section-index">{layoutLabels[profile.layout]}</p><h2>{profile.lens}</h2></div><p>Potential scope is developed around the zones, controls and daily operating pattern—not inferred from the industry label.</p></div>
          <div className="sector-zones">{profile.zones.map((zone, index) => <article key={zone.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{zone.title}</h3><p>{zone.copy}</p></article>)}</div>
        </div>
      </section>

      <section className="section sector-workstreams"><div className="shell sector-workstreams__grid">
        <figure><Image src={profile.secondaryImage} alt={profile.secondaryAlt} fill quality={90} sizes="(max-width: 860px) 100vw, 46vw" /></figure>
        <div><p className="section-index">Relevant workstreams</p><h2>Where confirmed services may support the operation.</h2><div className="sector-workstream-list">{profile.workstreams.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div><Link className="text-link" href="/services/integrated-facility-management">See how workstreams are coordinated <ArrowRight aria-hidden="true" /></Link></div>
      </div></section>

      <section className="section section--ink sector-planning"><div className="shell"><div className="section-heading"><div><p className="section-label section-label--light">Planning questions</p><h2>Details to resolve before a workable proposal.</h2></div><p>These are sector-relevant inputs for assessment—not guarantees about staffing, systems, access or specialist capability.</p></div><div className="sector-planning__grid">{profile.planning.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></div></section>

      <section className="scope-note"><div className="shell"><strong>Scope boundary</strong><p>{industry.boundary ?? `Suitability for a ${industry.title.toLowerCase()} facility depends on site assessment, approved access, defined responsibilities and written agreement.`}</p></div></section>

      <section className="section sector-evidence"><div className="shell sector-evidence__grid"><div><p className="section-index">Responsible proposition</p><h2>Current capability stays visible.</h2><p>SIF&apos;s confirmed delivery components are housekeeping, commercial cleaning and industrial cleaning. Technical, regulated, restricted or specialist activities are not implied by this sector page.</p></div><div><h3>Typical needs to discuss</h3><ul>{industry.challenges.map((item) => <li key={item}>{item}</li>)}</ul><h3>Operating inputs already identified</h3><ul>{industry.considerations.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>

      <section className="section section--neutral faq-section"><div className="shell faq-grid"><div><p className="section-index">Sector questions</p><h2>Clarify the boundary before defining the work.</h2></div><div>{profile.questions.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></div></section>

      <section className="related-sectors"><div className="shell"><p className="section-index">Related operating environments</p><div>{related.map((item) => <Link key={item.slug} href={`/industries/${item.slug}`}><span>{item.title}</span><ArrowRight aria-hidden="true" /></Link>)}</div></div></section>
      <CallToAction title={`Discuss your ${industry.title.toLowerCase()} facility.`} copy="Share the site type, operating pattern, work zones and immediate priorities. SIF can help determine an appropriate, clearly bounded scope." />
    </>
  );
}
