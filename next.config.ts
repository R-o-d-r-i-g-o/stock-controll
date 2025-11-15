import nextPwa from "next-pwa";
import { z } from "zod";

import type { NextConfig } from "next";

const validateConfig = () => {
  const configSchema = z.object({
    // checkout
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),

    // helper
    NODE_ENV: z.string(),
    IS_SERVER_FLAG: z.coerce.boolean(),

    // auth:
    NEXTAUTH_URL: z.string(),
    NEXTAUTH_SECRET: z.string(),

    // database
    DATABASE_URL: z.string(),
  });

  const config = configSchema.safeParse(process.env);
  if (!!config.error) {
    console.info("\n❌ Invalid environment variables:");
    console.info("\n❌ error thrown: " + config.error.message);
    process.exit(1);
  }
};
validateConfig();

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
