import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { CallToAction } from "@/components/call-to-action";
import { assets } from "@/config/assets";

export const metadata: Metadata = { title: "Our Approach", description: "SIF's practical framework for defining, mobilising, supervising and reviewing facility support." };

const stages = [
  ["Requirement discovery", "We discuss the facility, the reason for the enquiry, the areas in scope and the outcome the organisation needs."],
  ["Site assessment", "Where appropriate, the site is reviewed to understand access, occupancy, surfaces, operating hours and local constraints."],
  ["Scope definition", "Tasks, zones, frequencies, responsibilities, exclusions and reporting expectations are documented for agreement."],
  ["Workforce planning", "The work pattern informs proposed deployment, supervision, equipment and consumable requirements."],
  ["Mobilisation & induction", "Before work begins, the agreed resources are prepared and relevant site instructions are communicated."],
  ["Execution & supervision", "Teams follow assigned routines while supervisors coordinate work, checks and issue escalation."],
  ["Reporting & review", "Observations are discussed against the agreed scope so that priorities and methods can be refined."],
] as const;

export default function ApproachPage() {
  return (
    <>
      <PageHero section="Our approach" title="A practical route from requirement to routine." lead="Our intended delivery framework makes the work explicit: what needs to happen, where, when, by whom and how it will be reviewed." image={assets.workforce.supervisor} imageAlt="Supervisor discussing daily facility work with a team" breadcrumbs={[{ label: "Our approach" }]} />
      <section className="section"><div className="shell approach-layout"><div className="approach-sticky"><p className="section-index">Delivery framework</p><h2>Seven connected stages.</h2><p>This is an operating approach, not a claim of third-party certification. Each engagement is shaped by the agreed commercial scope.</p></div><ol className="approach-steps">{stages.map(([title, copy], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol></div></section>
      <section className="section section--neutral"><div className="shell image-story image-story--reverse"><figure><Image src={assets.home.operations} alt="Facility operations being reviewed on site" fill quality={90} sizes="(max-width: 850px) 100vw, 52vw" /></figure><div><p className="section-index">The operating document</p><h2>A scope should settle the important questions.</h2><p>Clear area boundaries, task frequency, working hours, site dependencies, exclusions, escalation contacts and review expectations give both teams a common point of reference.</p></div></div></section>
      <CallToAction />
    </>
  );
}
