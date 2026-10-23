import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [90],
  },
  async redirects() {
    return [{ source: "/services/integrated-facility-solutions", destination: "/services/integrated-facility-management", permanent: true }];
  },
};

export default nextConfig;
