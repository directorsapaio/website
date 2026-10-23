"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "./brand-mark";
import { componentServices } from "@/config/services";
import { industriesByFamily } from "@/config/industries";
import { primaryNavigation, resourceNavigation } from "@/config/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const families = industriesByFamily();

  const supportsHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const closeNavigation = () => { setOpen(false); setOpenMenu(null); };

  useEffect(() => {
    const closeFromOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) closeNavigation();
    };
    const closeFromEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeNavigation();
    };
    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("keydown", closeFromEscape);
    return () => {
      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("keydown", closeFromEscape);
    };
  }, []);

  return (
    <header className="site-header" ref={headerRef} onPointerLeave={() => supportsHover() && setOpenMenu(null)}>
      <div className="header-inner">
        <BrandMark />
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => { if (value) setOpenMenu(null); return !value; })}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav id="primary-navigation" className={`primary-nav${open ? " is-open" : ""}`} aria-label="Primary navigation">
          <div className="nav-links">
            {primaryNavigation.map((item) =>
              "menu" in item && item.menu === "services" ? (
                <details className="nav-menu" key={item.href} open={openMenu === item.menu} onPointerEnter={() => supportsHover() && setOpenMenu(item.menu)} onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setOpenMenu(null)}>
                  <summary className={pathname.startsWith("/services") ? "is-active" : ""} onClick={(event) => { event.preventDefault(); setOpenMenu((current) => current === item.menu ? null : item.menu); }}>
                    {item.label}<ChevronDown aria-hidden="true" />
                  </summary>
                  <div className="mega-menu mega-menu--services">
                    <div className="mega-intro">
                      <span>Flagship proposition</span>
                      <strong>One operating view of the facility.</strong>
                      <p>Coordinate the approved scope, people, responsibilities and review around real site conditions.</p>
                      <Link href="/services/integrated-facility-management" onClick={closeNavigation}>Explore integrated facility management</Link>
                    </div>
                    <div className="mega-links">
                      <p className="mega-links__label">Confirmed service components</p>
                      {componentServices.map((service) => (
                        <Link key={service.slug} href={`/services/${service.slug}`} onClick={closeNavigation}>
                          <strong>{service.shortTitle}</strong>
                          <span>{service.summary}</span>
                        </Link>
                      ))}
                      <Link className="mega-links__all" href="/services" onClick={closeNavigation}><strong>All capabilities</strong><span>Review current and scope-dependent workstreams.</span></Link>
                    </div>
                  </div>
                </details>
              ) : "menu" in item && item.menu === "sectors" ? (
                <details className="nav-menu" key={item.href} open={openMenu === item.menu} onPointerEnter={() => supportsHover() && setOpenMenu(item.menu)} onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setOpenMenu(null)}>
                  <summary className={pathname.startsWith("/industries") ? "is-active" : ""} onClick={(event) => { event.preventDefault(); setOpenMenu((current) => current === item.menu ? null : item.menu); }}>
                    {item.label}<ChevronDown aria-hidden="true" />
                  </summary>
                  <div className="mega-menu mega-menu--sectors">
                    {families.map(({ family, items }) => (
                      <div className="mega-group" key={family}>
                        <strong>{family}</strong>
                        {items.map((industry) => (
                          <Link key={industry.slug} href={`/industries/${industry.slug}`} onClick={closeNavigation}>
                            {industry.title}
                          </Link>
                        ))}
                      </div>
                    ))}
                    <Link className="mega-all" href="/industries" onClick={closeNavigation}>Explore all sectors</Link>
                  </div>
                </details>
              ) : "menu" in item && item.menu === "resources" ? (
                <details className="nav-menu" key={item.href} open={openMenu === item.menu} onPointerEnter={() => supportsHover() && setOpenMenu(item.menu)} onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setOpenMenu(null)}>
                  <summary className={resourceNavigation.some((resource) => pathname === resource.href) ? "is-active" : ""} onClick={(event) => { event.preventDefault(); setOpenMenu((current) => current === item.menu ? null : item.menu); }}>
                    {item.label}<ChevronDown aria-hidden="true" />
                  </summary>
                  <div className="mega-menu mega-menu--resources">
                    <div className="mega-intro">
                      <span>Company resources</span>
                      <strong>How SIF intends to work.</strong>
                      <p>Review our delivery framework, responsible working principles and enquiry routes.</p>
                    </div>
                    <div className="resource-links">
                      {resourceNavigation.map((resource) => (
                        <Link key={resource.href} href={resource.href} onClick={closeNavigation}>
                          <strong>{resource.label}</strong>
                          <span>{resource.description}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </details>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={pathname === item.href ? "is-active" : ""}
                  onPointerEnter={() => supportsHover() && setOpenMenu(null)}
                  onClick={closeNavigation}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
          <Link className="button button--small" href="/contact#enquiry" onClick={closeNavigation}>
            Request a proposal
          </Link>
        </nav>
      </div>
    </header>
  );
}
