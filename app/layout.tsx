import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { appConfig } from "@/common/constants";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const { name, title, titleTemplate, description } = appConfig;

export const metadata: Metadata = {
  title: {
    default: title,
    template: titleTemplate,
  },
  description,
  applicationName: name,
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <body className={`${inter.className} antialiased`}>
      {children}
      <ToastContainer />
    </body>
  </html>
);

export default RootLayout;
