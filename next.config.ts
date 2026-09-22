import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/saturday-hack-night",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
