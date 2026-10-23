import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found section"><div className="shell"><p className="section-index">404 / Page not found</p><h1>This page is not part of the current public site.</h1><p>It may have moved, or the service may still be awaiting business approval.</p><div className="hero-actions"><Link className="button" href="/"><ArrowLeft />Return home</Link><Link className="text-link" href="/services">View current services <ArrowRight /></Link></div></div></section>
  );
}
