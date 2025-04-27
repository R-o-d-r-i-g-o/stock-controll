"use server";

import React from "react";
import InfoIcon from "@mui/icons-material/InfoOutlined";

import * as src from "@/lib/services";
import { defaultDateMask } from "@/common/constants";
import moment from "moment";

type InfoButtonProps = React.HTMLAttributes<HTMLDivElement> & {};

const InfoButton = async ({ className }: InfoButtonProps) => {
  const appData = await src.fetchHealthData();

  return (
    <div className={`relative ${className}`}>
      <div className="fixed bottom-5 left-5 group">
        <div className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-lg group-hover:rounded-r-none">
          <InfoIcon className="text-black" />
        </div>
        <div className="absolute left-12 bottom-0 text-sm w-56 p-4 text-left space-y-3 bg-white text-gray-700 rounded-lg shadow-lg transform origin-bottom-left opacity-0 group-hover:opacity-100">
          <p className="flex justify-between">
            <span className="font-semibold">Versão:</span>
            <span>{appData.version}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-semibold">Banco:</span>
            <span>{appData.database ? "🟢 Disponível" : "🔴 Indisponível"}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-semibold">Build:</span>
            <span>{moment(appData.lastBuild).format(defaultDateMask)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoButton;
