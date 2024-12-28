"use client"

import React from 'react';
import { useQRCode } from 'next-qrcode';

type QrCodeProps = {
  text: string;
}

const QrCode = ({ text }: QrCodeProps) => {
  const { Canvas } = useQRCode();

  return (
    <Canvas
      text={text}
      options={{
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: '#010599FF',
          light: '#FFBF60FF',
        },
      }}
    />
  );
}

export default QrCode;