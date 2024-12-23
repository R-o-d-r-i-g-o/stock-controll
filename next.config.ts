import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  publicRuntimeConfig: {
    modifiedDate: new Date().toISOString(),
  },
};

export default nextConfig;
