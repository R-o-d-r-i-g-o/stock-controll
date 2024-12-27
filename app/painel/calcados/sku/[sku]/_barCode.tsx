"use client"

import React from 'react';
import { useBarcode } from 'next-barcode';

type BarCodeProps = {
  text: string;
}

const BarCode = ({ text }: BarCodeProps) => {
  const { inputRef } = useBarcode({
    value: text,
    options: {
      displayValue: false,
      background: '#ccffff',
    }
  });

  return <canvas ref={inputRef} />;
}

export default BarCode;