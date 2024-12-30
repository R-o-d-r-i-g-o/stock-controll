"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { useZxing, Result } from "react-zxing";
import { useMediaDevices } from "react-media-devices";

// Doc: https://www.npmjs.com/package/react-zxing

type ScannerProps = {
  onResult?: (sku: string) => void;
  beepEnabled?: boolean;
  className?: string;
  paused?: boolean;
};

const constraints: MediaStreamConstraints = {
  video: true,
  audio: false,
};

const CodeScanner = ({
  beepEnabled = false,
  paused = false,
  className,
  onResult,
}: ScannerProps) => {
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [selectedCamera, setSelectedCamera] = useState<string | undefined>();
  const [result, setResult] = useState("");

  const videoDevices = useMediaDevices({ constraints }).devices?.filter(
    (device) => device.kind === "videoinput"
  );

  const handleBeepSound = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedCamera(e.target.value);
  };

  const handleScannerResult = (res: Result) => {
    const newCode = res.getText();
    if (newCode === "") return;

    setResult(newCode);
    setLoading(false);
  };

  const { ref, torch } = useZxing({
    paused,
    deviceId: selectedCamera,
    onDecodeResult: handleScannerResult,
  });

  useEffect(() => {
    if (loading) return;
    if (onResult) onResult(result);
    if (beepEnabled) handleBeepSound();

    return () => {
      torch.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

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
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-500 transform -translate-y-1/2 pointer-events-none" />
      </div>
      <audio ref={audioRef} src="/sounds/beep.mp3" />
    </React.Fragment>
  );
};

export default memo(CodeScanner);
