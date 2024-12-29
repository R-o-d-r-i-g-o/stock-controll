"use client";

import React, { useState, useEffect } from "react";
import { useZxing } from "react-zxing";
import { useMediaDevices } from "react-media-devices";

// Doc: https://www.npmjs.com/package/react-zxing

type ScannerProps = {
  cameraStatus?: (isAvailable: boolean) => void;
  onResult?: (sku: string) => void;
  className?: string;
  paused?: boolean;
};

const constraints: MediaStreamConstraints = {
  video: true,
  audio: false,
};

const CodeScanner = ({
  className,
  cameraStatus,
  onResult,
  paused,
  ...rest
}: ScannerProps) => {
  const [result, setResult] = useState("");
  const [selectedCamera, setSelectedCamera] = useState<string | undefined>();

  // handle media devices
  const { devices } = useMediaDevices({ constraints });
  const videoDevices = devices?.filter(
    (device) => device.kind === "videoinput"
  );

  // handle camera
  const { ref, torch } = useZxing({
    ...rest,
    paused,
    deviceId: selectedCamera,
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  useEffect(() => {
    if (onResult) onResult(result);
    if (cameraStatus) cameraStatus(torch.isAvailable ?? false);

    return () => {
      torch.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [torch, result]);

  const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedCamera(e.target.value);
  };

  return (
    <React.Fragment>
      {videoDevices && videoDevices.length > 0 && (
        <div className="mb-4">
          <label
            htmlFor="camera-select"
            className="block text-sm font-medium text-gray-700"
          >
            Selecione a câmera
          </label>
          <select
            id="camera-select"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={selectedCamera}
            onChange={handleCameraChange}
          >
            {videoDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Câmera ${device.deviceId}`}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="relative h-min rounded-md overflow-hidden">
        <video className={className} ref={ref} />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-500 transform -translate-y-1/2 pointer-events-none"></div>
      </div>
    </React.Fragment>
  );
};

export default CodeScanner;
