import type { Metadata } from "next";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { assets } from "@/config/assets";

export const metadata: Metadata = { title: "Insights", description: "A future SIF resource for practical facility management and workplace hygiene guidance." };

export default function InsightsPage() {
  return (
    <>
      <PageHero section="Insights" title="Practical thinking for better-kept facilities." lead="This section is being prepared for original SIF articles on housekeeping, workplace hygiene, industrial cleaning and workforce coordination." image={assets.home.introduction} imageAlt="Facility professional reviewing a clean workplace" breadcrumbs={[{ label: "Insights" }]} />
      <section className="section"><div className="shell empty-state"><BookOpen aria-hidden="true" /><p className="section-index">Publication desk</p><h2>No articles have been published yet.</h2><p>We will add material here when useful, reviewed content is ready. We have not created placeholder articles, dates or author profiles.</p><Link className="text-link" href="/our-approach">Explore our operating approach <ArrowRight /></Link></div></section>
    </>
  );
}
