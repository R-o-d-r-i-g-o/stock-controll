import nextPwa from "next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: "camera=()",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXT_PUBLIC_API_URL!,
          },
        ],
      },
    ];
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
