import Image from "next/image";
import { Breadcrumbs } from "./breadcrumbs";

type PageHeroProps = {
  section: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  breadcrumbs?: { label: string; href?: string }[];
};

export function PageHero({ section, title, lead, image, imageAlt, breadcrumbs }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="shell page-hero__grid">
        <div className="page-hero__copy">
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          <p className="section-label">{section}</p>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
        </div>
        <figure className="page-hero__media">
          <Image src={image} alt={imageAlt} fill priority quality={90} sizes="(max-width: 800px) 100vw, 52vw" />
        </figure>
      </div>
    </section>
  );
}
