import type { Metadata } from "next";
import Image from "next/image";
import { Leaf, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CallToAction } from "@/components/call-to-action";
import { assets } from "@/config/assets";

export const metadata: Metadata = { title: "Quality, Safety & Sustainability", description: "SIF's grounded approach to work quality, safe practices, responsible resource use and improvement." };

const commitments = [
  { icon: Sparkles, title: "Work quality", copy: "Translate the agreed scope into practical routines, area ownership and supervisor checks." },
  { icon: ShieldCheck, title: "Safe practices", copy: "Consider site instructions, task hazards, access controls and appropriate PPE before work begins." },
  { icon: Leaf, title: "Responsible use", copy: "Use water, chemicals, consumables and equipment thoughtfully within the agreed method." },
  { icon: TrendingUp, title: "Continuous improvement", copy: "Use observations and review conversations to identify practical adjustments." },
] as const;

export default function QualityPage() {
  return (
    <>
      <PageHero section="Quality, safety & sustainability" title="Responsible work is specific, visible and repeatable." lead="We approach quality and safety as daily operating disciplines. Methods and controls must fit the task, the facility and the rules of the site." image={assets.home.responsibility} imageAlt="Facilities professional following a careful cleaning routine" breadcrumbs={[{ label: "Quality, safety & sustainability" }]} />
      <section className="section"><div className="shell commitment-grid">{commitments.map(({ icon: Icon, title, copy }) => <article key={title}><Icon aria-hidden="true" /><h2>{title}</h2><p>{copy}</p></article>)}</div></section>
      <section className="section section--neutral"><div className="shell image-story"><figure><Image src={assets.workforce.detail} alt="Cleaning professional carrying out detail-oriented facility work" fill quality={90} sizes="(max-width: 850px) 100vw, 52vw" /></figure><div><p className="section-index">At task level</p><h2>Controls should follow the work.</h2><p>PPE, training, equipment selection and supervision depend on the actual activity and work environment. These are considered during scope and mobilisation rather than presented as one universal checklist.</p><div className="boundary-box"><strong>No unverified claims</strong><p>SIF does not claim ISO certification, environmental accreditation, audit scores, safety records or sector-specific approvals on this website.</p></div></div></div></section>
      <CallToAction title="Set clear expectations for your site." copy="Discuss your facility rules, cleaning priorities and operating constraints with SIF." />
    </>
  );
}
