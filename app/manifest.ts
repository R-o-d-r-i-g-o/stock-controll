import { appConfig } from "@/common/constants";
import type { MetadataRoute } from "next";

const { name, description } = appConfig;

const manifest = (): MetadataRoute.Manifest => ({
  name,
  description,
  short_name: name,
  start_url: "/",
  display: "standalone",
  theme_color: "#000000",
  background_color: "#ffffff",
  icons: [
    {
      src: "/icons/web-app-manifest-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/icons/web-app-manifest-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
});

export default manifest;
