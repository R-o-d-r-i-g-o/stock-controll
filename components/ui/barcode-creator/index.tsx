"use client";

import React from "react";
import { useBarcode } from "next-barcode";

type BarCodeCreatorProps = {
  text: string;
};

const BarCodeCreator: React.FC<BarCodeCreatorProps> = ({ text }) => {
  const { inputRef } = useBarcode({
    value: text,
    options: {
      displayValue: false,
      background: "#ccffff",
    },
  });

  return <canvas ref={inputRef} />;
};

export default BarCodeCreator;
