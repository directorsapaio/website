import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CallToAction } from "@/components/call-to-action";
import { PageHero } from "@/components/page-hero";
import { assets } from "@/config/assets";
import { capabilitiesByCategory, capabilityStatusLabels } from "@/config/capabilities";

export const metadata: Metadata = {
  title: "Integrated Facility Management",
  description: "Explore SIF's coordinated approach to facility scope, people, service workstreams, supervision and performance review.",
  alternates: { canonical: "/services/integrated-facility-management" },
};

const operatingSpine = [
  ["Facility conditions", "Understand occupancy, work zones, access, operating hours and site controls."],
  ["Agreed scope", "Define outcomes, responsibilities, service boundaries, frequencies and exclusions."],
  ["People & workstreams", "Plan confirmed services and any separately approved supporting workstreams."],
  ["Coordination", "Set supervision, communication, handovers and issue-escalation routes."],
  ["Review", "Discuss observations, changing conditions and practical improvements to the agreed plan."],
] as const;

const mobilisationInputs = [
  "Facility type, size and operating pattern",
  "Public, occupied, controlled and support zones",
  "Working hours, access windows and peak periods",
  "Approved service scope and explicit exclusions",
  "Proposed workforce, supervision and site contacts",
  "Equipment, materials, storage and utility access",
  "Site induction, PPE and task-specific instructions",
  "Expected records, review rhythm and escalation path",
] as const;

const faqs = [
  ["What does integrated facility management mean at SIF?", "It means starting with the facility as one operating environment, then coordinating the services, people, responsibilities and review arrangements included in an agreed scope."],
  ["Which services are currently confirmed?", "SIF currently publishes housekeeping, commercial cleaning and industrial cleaning as confirmed service components. Other workstreams shown on this page require project-specific confirmation or remain in development."],
  ["Can SIF manage technical maintenance?", "Technical and building-maintenance workstreams are not presented as established direct capabilities. They may be discussed only when scope, competent delivery resources, responsibility and approval are verified."],
  ["Is security included?", "No. Security services and independent emergency-response services are not part of SIF's public offering."],
  ["How is a proposal developed?", "SIF first needs the site context, work areas, operating hours, priorities and expected responsibilities. A site assessment may then be needed before scope and commercials can be agreed."],
  ["Does this page promise a fixed workforce or service level?", "No. Staffing, schedules, methods, reporting and service expectations depend on assessment and written agreement for the individual facility."],
] as const;

export default function IntegratedFacilityManagementPage() {
  const groups = capabilitiesByCategory();
  return (
    <>
      <PageHero section="Flagship capability" title="Integrated facility management, organised around the operation." lead="SIF brings facility conditions, confirmed services, people, responsibilities and review into one clearly defined operating scope. Cleaning remains a core delivery capability; additional workstreams are included only when their availability and delivery arrangement are confirmed." image={assets.home.operations} imageAlt="Facilities supervisor coordinating work with an operational service team" breadcrumbs={[{ label: "Services", href: "/services" }, { label: "Integrated Facility Management" }]} />

      <section className="section ifm-definition">
        <div className="shell ifm-definition__grid">
          <div><p className="section-index">One operating view</p><h2>From separate tasks to coordinated facility support.</h2></div>
          <div className="ifm-definition__copy"><p>A facility is affected by more than the quality of one task. Occupancy, access, work windows, handovers, responsibilities and site controls all shape whether daily support fits the operation.</p><p>SIF&apos;s IFM proposition creates a common plan around the workstreams that are genuinely available for the engagement. It does not turn proposed or specialist capabilities into automatic promises.</p></div>
        </div>
      </section>

      <section className="section section--ink ifm-spine">
        <div className="shell">
          <div className="section-heading"><div><p className="section-label section-label--light">Coordination spine</p><h2>Five connected decisions keep the scope usable.</h2></div><p>Each decision leads to the next. If the site changes, the plan can be reviewed without losing sight of ownership and boundaries.</p></div>
          <ol className="coordination-spine">{operatingSpine.map(([title, copy], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="section capability-register">
        <div className="shell">
          <div className="section-heading split-heading"><div><p className="section-index">Capability register</p><h2>Clear about what is current—and what needs confirmation.</h2></div><p>Status labels are intentional. They prevent a potential workstream from being presented as a standard available service.</p></div>
          <div className="capability-groups">{groups.map(({ category, items }) => <section key={category} className="capability-group"><h3>{category}</h3><div>{items.map((item) => <article key={item.id}><div><strong>{item.title}</strong><span data-status={item.status}>{capabilityStatusLabels[item.status]}</span></div><p>{item.summary}</p>{item.disclosure && <small>{item.disclosure}</small>}</article>)}</div></section>)}</div>
          <p className="capability-disclosure">Security services and independent emergency-response services are not offered. Availability of scope-dependent workstreams is established during enquiry and proposal development.</p>
        </div>
      </section>

      <section className="section section--neutral">
        <div className="shell ifm-applications">
          <figure><Image src={assets.workforce.briefing} alt="Facilities supervisor briefing a service team before work" fill quality={90} sizes="(max-width: 850px) 100vw, 44vw" /></figure>
          <div><p className="section-index">Before mobilisation</p><h2>The operating details that need to be visible.</h2><p>A dependable start depends on shared information, not assumptions.</p><ul>{mobilisationInputs.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" />{item}</li>)}</ul></div>
        </div>
      </section>

      <section className="section">
        <div className="shell ifm-sector-links">
          <div><p className="section-index">Facility context</p><h2>Explore how the planning questions change by sector.</h2></div>
          <div>{[
            ["Transport & public infrastructure", "/industries/transport-infrastructure"],
            ["Healthcare, education & public institutions", "/industries/healthcare"],
            ["Corporate, banking & technology", "/industries/it-ites"],
            ["Industrial, energy & logistics", "/industries/manufacturing"],
            ["Commercial & community facilities", "/industries/commercial-real-estate"],
          ].map(([label, href]) => <Link href={href} key={href}>{label}<ArrowRight aria-hidden="true" /></Link>)}</div>
        </div>
      </section>

      <section className="section section--neutral faq-section"><div className="shell faq-grid"><div><p className="section-index">Questions before enquiry</p><h2>What the proposition does—and does not—mean.</h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
      <CallToAction title="Build an operating scope around your facility." copy="Share the site, operating pattern, immediate priorities and responsibilities you need coordinated. SIF can help frame the next discussion." />
    </>
  );
}
