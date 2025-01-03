import nextPwa from "next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXTAUTH_URL}/:path*`,
      },
    ]
  },

  publicRuntimeConfig: {
    modifiedDate: new Date().toISOString(),
  },
};

const withPWA = nextPwa({
  dest: "/public/workers",
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  disableDevLogs: true,
  register: true,
  disable: false,
  runtimeCaching: [
    {
      urlPattern: /^\/api\//,
      handler: "NetworkOnly",
    },
  ],
});

// @ts-expect-error/its-already-the-way-is-in-documentation
const config = withPWA(nextConfig);

export default config;
