import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { CallToAction } from "@/components/call-to-action";
import { ImageSlideshow } from "@/components/image-slideshow";
import { assets } from "@/config/assets";
import { componentServices, flagshipService } from "@/config/services";

const heroSlides = [
  {
    src: assets.home.hero,
    alt: "SIF facilities supervisor coordinating housekeeping work in a commercial interior",
    label: "Workplace operations",
    caption: "Supervision, task clarity and service coordination around an occupied facility.",
  },
  {
    src: assets.home.operations,
    alt: "Facility team reviewing operational requirements together",
    label: "Site coordination",
    caption: "The service plan begins with the facility, its users and its operating conditions.",
  },
  {
    src: assets.workforce.briefing,
    alt: "Facilities supervisor briefing a service team before work",
    label: "Workforce readiness",
    caption: "Defined responsibilities and practical briefings support organised execution.",
  },
  {
    src: assets.industrial[0],
    alt: "Cleaning personnel working in an industrial environment",
    label: "Industrial environments",
    caption: "Agreed work zones, site instructions and appropriate methods shape the scope.",
  },
] as const;

const introductionSlides = [
  {
    src: assets.home.introduction,
    alt: "Housekeeping personnel working together in a professional facility",
    label: "Daily facility care",
    caption: "Routine work is organised around occupancy, footfall and presentation priorities.",
  },
  {
    src: assets.home.about,
    alt: "Facility professional reviewing work in a shared environment",
    label: "Visible accountability",
    caption: "A defined scope makes areas, tasks and communication routes easier to understand.",
  },
  {
    src: assets.workforce.team,
    alt: "Professional housekeeping team prepared for a facility shift",
    label: "People and roles",
    caption: "Workforce planning connects the agreed tasks with the people expected to deliver them.",
  },
] as const;

const sectorSlides = [
  {
    src: assets.transport[0],
    alt: "Housekeeping personnel maintaining a busy transport terminal",
    label: "Transport and public infrastructure",
    title: "Public movement shapes the service plan.",
    caption: "High footfall, access windows and continuous public use influence routines and timing.",
    href: "/industries/transport-infrastructure",
  },
  {
    src: assets.institutions[3],
    alt: "Housekeeping professional caring for an institutional facility",
    label: "Healthcare, education and government",
    title: "Occupied institutions need clear boundaries.",
    caption: "Area use, site-led protocols and uninterrupted daily activity inform the proposed scope.",
    href: "/industries/healthcare",
  },
  {
    src: assets.corporate[1],
    alt: "Facilities professional working in a contemporary office",
    label: "Corporate and financial",
    title: "Presentation and continuity work together.",
    caption: "Cleaning schedules should respect business hours, visitors and approved workplace zones.",
    href: "/industries/banking-and-financial-services",
  },
  {
    src: assets.industrial[3],
    alt: "Cleaning team working in an industrial facility",
    label: "Industrial and logistics",
    title: "The operating environment defines the boundary.",
    caption: "Movement, production activity and site rules determine where ordinary support may apply.",
    href: "/industries/manufacturing",
  },
  {
    src: assets.home.responsibility,
    alt: "Housekeeping professional maintaining a shared commercial facility",
    label: "Commercial and community facilities",
    title: "Shared spaces need consistent daily care.",
    caption: "Common areas, amenities and public-facing spaces benefit from clear, unobtrusive routines.",
    href: "/industries/commercial-real-estate",
  },
] as const;

const serviceSlides = [
  {
    src: assets.home.operations,
    alt: "Facilities supervisor coordinating an operational service team",
    label: "Integrated facility management",
    caption: "Relevant services, responsibilities and review are organised within one defined operating scope.",
  },
  {
    src: assets.workforce.team,
    alt: "Professional housekeeping team ready for daily facility duties",
    label: "Housekeeping",
    caption: "Planned daily upkeep for occupied workplaces, amenities and shared environments.",
  },
  {
    src: assets.corporate[0],
    alt: "Cleaning professional working in a modern commercial facility",
    label: "Commercial cleaning",
    caption: "Cleaning programmes aligned with occupancy, visitors and workplace priorities.",
  },
  {
    src: assets.industrial[0],
    alt: "Cleaning personnel maintaining an industrial work environment",
    label: "Industrial cleaning",
    caption: "Site-aware support for authorised production-support, warehouse and non-process areas.",
  },
] as const;

const workforceSlides = [
  {
    src: assets.workforce.supervisor,
    alt: "Facilities supervisor briefing a housekeeping team",
    label: "Brief the work",
    caption: "People need to understand the area, method and expected result before a task begins.",
  },
  {
    src: assets.workforce.equipment,
    alt: "Facility personnel preparing suitable cleaning equipment",
    label: "Prepare correctly",
    caption: "Equipment and PPE are considered against the activity and conditions of the site.",
  },
  {
    src: assets.workforce.detail,
    alt: "Cleaning professional carrying out detail-oriented facility work",
    label: "Review execution",
    caption: "Supervision and feedback help routines remain clear as operating conditions change.",
  },
] as const;

const process = [
  ["Understand", "Discuss the facility, operating context, priorities and expected outcomes."],
  ["Assess", "Review work zones, footfall, timings, access and practical constraints."],
  ["Define", "Set tasks, frequencies, methods, responsibilities and exclusions."],
  ["Plan", "Agree the team structure, working windows, equipment and induction needs."],
  ["Coordinate", "Brief the team, supervise the work and keep communication routes clear."],
  ["Review", "Discuss observations and improve the agreed plan where the site needs it."],
] as const;

const reasons = [
  ["Requirement first", "The conversation begins with how the facility actually operates."],
  ["Defined scope", "Tasks, zones, frequency and boundaries are made clear before mobilisation."],
  ["Workforce planning", "People, shifts and equipment are considered against the agreed work."],
  ["Organised communication", "Site contacts, supervision and escalation routes are established."],
  ["Hygiene and presentation", "Daily routines focus on orderly, well-maintained environments."],
  ["Responsible practice", "Site rules, appropriate PPE and task-specific methods guide execution."],
] as const;

const publicServices = [flagshipService, ...componentServices];

export default function HomePage() {
  return (
    <>
      <section className="home-masthead">
        <div className="shell home-masthead__grid">
          <div className="home-masthead__copy">
            <p className="home-overline home-overline--light">Integrated facility management for operational environments</p>
            <h1>Facility support, planned around the way your site works.</h1>
            <p className="home-masthead__lead">SIF brings housekeeping, cleaning and approved facility-support workstreams into a clear operating scope—built around people, place and daily activity.</p>
            <div className="home-masthead__actions">
              <Link className="button button--accent" href="/contact#enquiry">Request a proposal <ArrowRight aria-hidden="true" /></Link>
              <Link className="text-link text-link--light" href="/services/integrated-facility-management">Review our IFM approach</Link>
            </div>
          </div>
          <ImageSlideshow slides={heroSlides} priority className="photo-reel--hero" />
        </div>
        <div className="shell home-masthead__rail" aria-label="Confirmed capability summary">
          <strong>Confirmed capabilities</strong>
          <span>Integrated facility management</span>
          <span>Professional housekeeping</span>
          <span>Commercial cleaning</span>
          <span>Industrial cleaning</span>
        </div>
      </section>

      <section className="section home-introduction">
        <div className="shell home-introduction__heading">
          <p className="home-overline">Sapaio Integrated Facilities Management Private Limited</p>
          <h2>A facility is not a checklist. It is a working environment.</h2>
        </div>
        <div className="shell home-introduction__grid">
          <ImageSlideshow slides={introductionSlides} className="photo-reel--editorial" />
          <div className="home-introduction__copy">
            <p className="home-introduction__lead">Cleanliness affects movement, presentation and the confidence with which daily activity continues. The right plan must reflect how each space is actually used.</p>
            <p>SIF starts with the requirement, maps confirmed services to the site and defines who is responsible for what. Housekeeping and cleaning can operate independently or as coordinated components of an integrated facility-management scope.</p>
            <Link className="text-link" href="/about">Understand how SIF works <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="section home-sectors">
        <div className="shell home-section-heading home-section-heading--light">
          <div>
            <p className="home-overline home-overline--light">Operating environments</p>
            <h2>Facility needs change from one sector to the next.</h2>
          </div>
          <p>Explore potential housekeeping, cleaning and facility-support applications. Sector pages describe operating considerations—not claims of existing contracts.</p>
        </div>
        <div className="shell home-sectors__grid">
          <ImageSlideshow slides={sectorSlides} className="photo-reel--sectors" />
          <nav className="home-sector-directory" aria-label="Sector families">
            {sectorSlides.map((sector, index) => (
              <Link href={sector.href} key={sector.label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{sector.label}</strong>
                <ArrowRight aria-hidden="true" />
              </Link>
            ))}
            <Link className="home-sector-directory__all" href="/industries">View the complete sector directory</Link>
          </nav>
        </div>
      </section>

      <section className="section home-services">
        <div className="shell home-section-heading">
          <div>
            <p className="home-overline">Service framework</p>
            <h2>A coordinated proposition with a confirmed delivery core.</h2>
          </div>
          <p>Integrated facility management provides the operating framework. Housekeeping and cleaning are the confirmed service components published today.</p>
        </div>
        <div className="shell home-services__grid">
          <ImageSlideshow slides={serviceSlides} className="photo-reel--services" />
          <div className="home-service-register">
            {publicServices.map((service, index) => (
              <article key={service.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <small>{service.kind === "flagship" ? "Operating proposition" : "Confirmed service"}</small>
                  <h3>{service.shortTitle}</h3>
                  <p>{service.summary}</p>
                </div>
                <Link href={`/services/${service.slug}`} aria-label={`Explore ${service.shortTitle}`}><ArrowRight aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-process">
        <div className="shell home-process__intro">
          <p className="home-overline home-overline--light">Delivery framework</p>
          <h2>From requirement to review, every stage has a purpose.</h2>
          <Link className="text-link text-link--light" href="/our-approach">See the full delivery approach <ArrowRight aria-hidden="true" /></Link>
        </div>
        <ol className="shell home-process__sequence">
          {process.map(([title, copy], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section home-workforce">
        <div className="shell home-workforce__grid">
          <ImageSlideshow slides={workforceSlides} className="photo-reel--workforce" />
          <div className="home-workforce__copy">
            <p className="home-overline">People and operations</p>
            <h2>Clear work is easier to brief, supervise and review.</h2>
            <p>Facility support depends on people understanding the area they own, the method to follow and who to speak to when conditions change.</p>
            <ul className="home-check-list">
              <li><Check aria-hidden="true" />Area and task allocation</li>
              <li><Check aria-hidden="true" />Site induction where applicable</li>
              <li><Check aria-hidden="true" />Appropriate equipment and PPE</li>
              <li><Check aria-hidden="true" />Supervisor-led work review</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section home-assurance">
        <div className="shell home-assurance__grid">
          <div className="home-assurance__intro">
            <p className="home-overline">Why organisations consider SIF</p>
            <h2>Credibility starts with doing the fundamentals well.</h2>
            <p>We focus on clarity, practical coordination and responsible working considerations—without unsupported claims about scale, clients or certifications.</p>
          </div>
          <div className="home-assurance__list">
            {reasons.map(([title, copy], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-responsibility">
        <div className="shell home-responsibility__inner">
          <div>
            <p className="home-overline">Quality, safety and responsible resource use</p>
            <h2>Good practice belongs in the daily routine.</h2>
          </div>
          <p>Methods, PPE, site instructions and responsible use of materials are practical working considerations—not unverified certification claims.</p>
          <Link className="text-link" href="/quality-safety-sustainability">Read our working principles <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
