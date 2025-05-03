"use client";

import data from "./data.json";
import Loader from "@/components/ui/loader";
import dynamic from "next/dynamic";

const RedocStandalone = dynamic(() => import("redoc").then((mod) => mod.RedocStandalone), {
  ssr: false,
  loading: Loader,
});

const ApiDocumentation = () => <RedocStandalone spec={data} />;

export default ApiDocumentation;
