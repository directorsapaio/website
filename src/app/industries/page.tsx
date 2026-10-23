import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CallToAction } from "@/components/call-to-action";
import { assets } from "@/config/assets";
import { industriesByFamily } from "@/config/industries";

export const metadata: Metadata = { title: "Industries", description: "Explore potential housekeeping and cleaning applications across infrastructure, institutional, corporate and industrial facilities." };

export default function IndustriesPage() {
  const groups = industriesByFamily();
  return (
    <>
      <PageHero section="Industries" title="The operating environment changes the facility plan." lead="Explore how occupancy, access, movement, protocols and service windows influence an integrated facility-management scope. These are target-sector applications, not claims of existing contracts." image={assets.transport[2]} imageAlt="Facility services in a large public infrastructure environment" breadcrumbs={[{ label: "Industries" }]} />
      <section className="section">
        <div className="shell industry-directory">
          <div className="directory-intro"><p className="section-index">Sector operating maps</p><h2>Start with the environment you operate.</h2><p>Each group brings together related conditions. Every destination then examines its own zones, workstreams, planning questions and scope boundaries.</p></div>
          <div className="directory-groups">
            {groups.map(({ family, items }, index) => (
              <section key={family} className="directory-group">
                <div className="directory-group__title"><span>0{index + 1}</span><h2>{family}</h2><figure><Image src={items[0].image} alt={items[0].imageAlt} fill quality={90} sizes="(max-width: 800px) 100vw, 28vw" /></figure></div>
                <div className="directory-group__links">{items.map((industry) => <Link href={`/industries/${industry.slug}`} key={industry.slug}><div><strong>{industry.title}</strong><small>{industry.summary}</small></div><ArrowRight /></Link>)}</div>
              </section>
            ))}
          </div>
        </div>
      </section>
      <CallToAction title="Your sector is only the starting point." copy="Tell us how your facility operates. We’ll discuss the actual work areas, timings and housekeeping priorities." />
    </>
  );
}
