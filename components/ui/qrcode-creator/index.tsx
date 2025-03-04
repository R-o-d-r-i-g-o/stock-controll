"use client";

import React from "react";
import { useQRCode } from "next-qrcode";

type QrCodeCreatorProps = {
  text: string;
};

const QrCodeCreator: React.FC<QrCodeCreatorProps> = ({ text }) => {
  const { Canvas } = useQRCode();

  return (
    <Canvas
      text={text}
      options={{
        errorCorrectionLevel: "M",
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: "#010599FF",
          light: "#FFBF60FF",
        },
      }}
    />
  );
};

export default QrCodeCreator;
