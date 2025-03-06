import React from "react";

import {
  Group,
  Summarize,
  AccessAlarm,
  LocalShipping,
  Cottage,
} from "@mui/icons-material";

import Ping from "@/components/ui/ping";
import Loader from "@/components/ui/loader";
import Drawer from "@/components/ui/drawer";
import Background from "@/components/templates/background";

type TemplateProps = {
  children: React.ReactNode;
};

const Template = ({ children }: TemplateProps) => {
  const menuOptions = [
    {
      lable: "Usuários",
      beta: false,
      icon: Group,
      nav: "/panel/users",
    },
    {
      lable: "Calçados",
      beta: true,
      icon: LocalShipping,
      nav: "/panel/shoes",
    },
    {
      lable: "Relatórios",
      beta: true,
      icon: Summarize,
      nav: "/panel/reports",
    },
    {
      lable: "Histórico",
      beta: false,
      icon: AccessAlarm,
      nav: "/panel/audits",
    },
    {
      lable: "Home",
      beta: false,
      icon: Cottage,
      nav: "/panel",
    },
  ];

  return (
    <Background className="flex-col gap-6 p-4">
      <React.Suspense fallback={<Loader />}>
        <Drawer menuOptions={menuOptions} />
        {children}
      </React.Suspense>
      <Ping className="hidden sm:block" />
    </Background>
  );
};

export default Template;
