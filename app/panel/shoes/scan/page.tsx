"use client";

import React from "react";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import ShoeScanForm from "@/components/shared/form/shoe-scan";

const ScanPage = () => {
  return (
    <Container>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full p-4 inline-block mb-4">
            <QrCodeScannerIcon className="text-white text-5xl" />
          </div>
          <Title className="text-center mb-2" text="Scanner de Etiquetas" />
          <p className="text-gray-600 text-sm">
            Escaneie códigos de barras ou QR codes para cadastrar ou dar baixa em itens
          </p>
        </div>
        <ShoeScanForm />
      </div>
    </Container>
  );
};

export default ScanPage;
