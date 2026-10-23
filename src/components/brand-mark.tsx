import Image from "next/image";
import Link from "next/link";
import { assets } from "@/config/assets";

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link className={`brand-mark${light ? " brand-mark--light" : ""}`} href="/" aria-label="SIF home">
      {assets.logo ? (
        <>
          <Image className="brand-logo" src={assets.logo} alt="SIF — Sapaio Integrated Facilities Management Private Limited logo" width={58} height={58} priority />
          <span className="brand-name">Sapaio Integrated<br />Facilities Management</span>
        </>
      ) : (
        <>
          <span className="brand-wordmark" aria-hidden="true">SIF</span>
          <span className="brand-name">Sapaio Integrated<br />Facilities Management</span>
        </>
      )}
    </Link>
  );
}
