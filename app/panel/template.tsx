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
    <Drawer />
    <React.Suspense fallback={<Loader />}>{children}</React.Suspense>
    <div className="hidden sm:block">
      <Ping />
    </div>
  </Background>
);

export default Template;
