"use client"

import { useState, useEffect } from "react";
import { useZxing } from "react-zxing";

// Doc: https://www.npmjs.com/package/react-zxing

type ScannerProps = {
  cameraStatus?: (isAvaiable: boolean) => void;
  onResult?: (sku: string) => void;
  className?: string;
  deviceId?: string;
  paused?: boolean;
}

const CodeScanner = ({ className, cameraStatus, onResult, ...rest }: ScannerProps) => {
  const [result, setResult] = useState("");
  const { ref, torch } = useZxing({
    ...rest,
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  useEffect(() => {
    if (onResult) onResult(result)
    if (cameraStatus) cameraStatus(torch.isAvailable ?? false)

    return () => { torch.off() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [torch, result])

  return <video className={className} ref={ref} />;
};

export default CodeScanner;