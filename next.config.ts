import type { NextConfig } from "next";

const basePath = "/cswithtoqeer";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: `${basePath}/`,
  env: {
    // next/link and next/image apply basePath automatically, but manual
    // references to files under public/ (e.g. <a href>, fetch) don't — this
    // exposes the same basePath so those references can prefix themselves.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
