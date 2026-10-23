import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CallToAction } from "@/components/call-to-action";
import { assets } from "@/config/assets";

export const metadata: Metadata = { title: "About SIF", description: "Learn how SIF approaches integrated facility management, coordinated delivery and confirmed cleaning services." };

export default function AboutPage() {
  return (
    <>
      <PageHero section="About SIF" title="Facility support shaped around how a place actually operates." lead="SIF is an Indian integrated facilities-management company building coordinated operating scopes around each site, with professional housekeeping, commercial cleaning and industrial cleaning as confirmed core capabilities." image={assets.home.about} imageAlt="SIF team in a professional facility environment" breadcrumbs={[{ label: "About" }]} />
      <section className="section">
        <div className="shell editorial-grid">
          <aside><p className="section-index">Our purpose</p><p className="pull-quote">To make essential facility work clearer to plan, easier to coordinate and more consistent to review.</p></aside>
          <div className="prose-large">
            <h2>Organised work supports organised operations.</h2>
            <p>Facility support affects how employees, visitors and operators experience a site every day. SIF helps organisations bring relevant workstreams into a clear plan shaped by people, movement, timings, priorities and controls.</p>
            <p>We do not treat every environment as interchangeable. An occupied office, a public institution and an industrial plant each require different task boundaries, schedules and ways of coordinating with the people already on site.</p>
          </div>
        </div>
      </section>
      <section className="section section--neutral">
        <div className="shell philosophy-grid">
          <div><p className="section-index">Business philosophy</p><h2>Practical before promotional.</h2></div>
          <div className="principle-list">
            <article><span>01</span><div><h3>Understand first</h3><p>The requirement, facility and work boundaries come before a deployment proposal.</p></div></article>
            <article><span>02</span><div><h3>Make ownership clear</h3><p>Teams work better when areas, tasks, checks and escalation routes are understood.</p></div></article>
            <article><span>03</span><div><h3>Review the reality</h3><p>Service conversations should be based on observations and the agreed scope.</p></div></article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell image-story">
          <figure><Image src={assets.workforce.supervisor} alt="Facility supervisor briefing a housekeeping team" fill quality={90} sizes="(max-width: 850px) 100vw, 52vw" /></figure>
          <div><p className="section-index">Workforce coordination</p><h2>Professionalism is built into the brief.</h2><p>Our intended delivery approach connects site assessment with workforce planning, induction, task allocation, supervision and review. The details vary by engagement; accountability should not.</p><ul className="check-list"><li><Check />Clear instructions</li><li><Check />Appropriate presentation and conduct</li><li><Check />Site-aware working methods</li><li><Check />Constructive issue follow-up</li></ul><Link className="text-link" href="/our-approach">See our approach <ArrowRight /></Link></div>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
