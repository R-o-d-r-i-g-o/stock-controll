import nextPwa from "next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  publicRuntimeConfig: {
    modifiedDate: new Date().toISOString(),
  },
};

const withPWA = nextPwa({
  dest: "public",
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  disableDevLogs: true,
  register: true,
  disable: false,
});

// @ts-expect-error/its-already-the-way-is-in-documentation
const config = withPWA(nextConfig);

export default config;
