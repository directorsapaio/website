import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CallToAction({ title = "Let’s discuss your facility requirements.", copy = "Tell us about the site, operating hours and priorities. We’ll begin with a practical conversation about scope, timing and delivery expectations.", link = "/contact#enquiry", label = "Request a proposal" }) {
  return (
    <section className="cta-band">
      <div className="shell cta-band__inner">
        <div><h2>{title}</h2><p>{copy}</p></div>
        <Link className="button button--light" href={link}>{label}<ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
