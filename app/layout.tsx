import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { appConfig } from "@/common/constants";

const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
      <ToastContainer />
    </body>
  </html>
);

export default RootLayout;
