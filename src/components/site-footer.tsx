import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { activeServices } from "@/config/services";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main shell">
        <div className="footer-brand">
          <BrandMark light />
          <p>Integrated facility management shaped around the operation, with confirmed housekeeping and cleaning capabilities.</p>
          <Link className="text-link text-link--light" href="/contact#enquiry">Discuss a requirement <ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <div className="footer-links">
          <div>
            <h2>Company</h2>
            <Link href="/about">About SIF</Link>
            <Link href="/our-approach">Our approach</Link>
            <Link href="/quality-safety-sustainability">Quality, safety & sustainability</Link>
            <Link href="/careers">Careers</Link>
          </div>
          <div>
            <h2>Services</h2>
            {activeServices.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.shortTitle}</Link>)}
            <Link href="/industries">Sectors</Link>
          </div>
          <div className="footer-contact">
            <h2>Contact</h2>
            <a href={`tel:+91${siteConfig.phone}`}><Phone aria-hidden="true" />{siteConfig.phoneDisplay}</a>
            <a href={`mailto:${siteConfig.email}`}><Mail aria-hidden="true" />{siteConfig.email}</a>
            <p><MapPin aria-hidden="true" />{siteConfig.address}</p>
          </div>
        </div>
      </div>
      <div className="footer-base shell">
        <p>© {new Date().getFullYear()} {siteConfig.name}</p>
        <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
      </div>
    </footer>
  );
}
