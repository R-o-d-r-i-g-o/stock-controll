"use client"

import React, { useState } from 'react';
import BarcodeReader from 'react-barcode-reader';

const Test = () => {
  const [result, setResult] = useState<object>({});
  const [test] = useState(true)

  const handleScan = (data: object) => {
    setResult(data);
  };

  const handleError = (err: Error) => {
    console.error("veio no erro", err);
  };

  console.log('carregou a tela corratametne')

  return test && (
    <div>
      <BarcodeReader
        onError={handleError}
        onScan={handleScan}
      />
      <p>{JSON.stringify(result)}</p>
    </div>
  );
};

export default Test;
