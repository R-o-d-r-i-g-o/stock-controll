import nextPwa from "next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },
  publicRuntimeConfig: {
    modifiedDate: new Date().toISOString(),
  },
};

const withPwa = nextPwa({
  dest: "/public/workers",
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  register: true,
  disable: false,
});

// @ts-expect-error/its-already-the-way-is-in-documentation
const config = withPwa(nextConfig);

export default config;
