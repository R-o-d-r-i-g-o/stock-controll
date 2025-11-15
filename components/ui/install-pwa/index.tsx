"use client";

import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";

import useInstallPWA from "./use-install-pwa";
import { appConfig } from "@/common/constants";

type InstallPWAProps = {
  className?: string;
};

const InstallPWA: React.FC<InstallPWAProps> = ({ className }) => {
  const { showInstallPrompt, handleInstall, handleDismiss } = useInstallPWA();

  if (!showInstallPrompt) return null;

  return (
    <div className={`fixed inset-0 bg-gray-500 bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${className}`}>
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full border-2 border-indigo-200">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100">
              <DownloadIcon className="text-indigo-600 text-2xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">Instalar App</h3>
              <p className="text-sm text-gray-600">
                Acesso rápido e notificações
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition duration-300"
            aria-label="Fechar"
          >
            <CloseIcon className="text-xl" />
          </button>
        </div>

        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
          Instale o {appConfig.title} no seu dispositivo para receber notificações e ter acesso rápido mesmo quando o navegador estiver fechado!
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleInstall}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <DownloadIcon className="mr-2 text-lg" />
            Instalar
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="flex-1 py-3 px-4 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300 border-2 border-gray-300"
          >
            Agora não
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPWA;
