import React from "react";

import Ping from "@/components/ui/ping";
import Loader from "@/components/ui/loader";
import Drawer from "@/components/ui/drawer";
import Background from "@/components/templates/background";

type TemplateProps = {
  children: React.ReactNode;
};

const Template = ({ children }: TemplateProps) => (
  <Background className="flex-col gap-6 p-4">
    <React.Suspense fallback={<Loader />}>
      <Drawer />
      {children}
    </React.Suspense>
    <Ping className="hidden sm:block" />
  </Background>
);

export default Template;
