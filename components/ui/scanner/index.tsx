"use client";

import React from "react";
import useScanner from "./use-scanner";
import InputLable from "../input-lable";
import InputSelect from "../input-select";

type ScannerProps = {
  paused?: boolean;
  onResult?: (sku: string) => void;
  className?: string;
  beepEnabled?: boolean;
};

const Scanner: React.FC<ScannerProps> = ({ className, ...rest }) => {
  const {
    videoRef,
    audioRef,
    selectedCamera,
    handleCameraChange,
    cameraDeviceOpstions,
  } = useScanner(rest);

  return (
    <React.Fragment>
      {cameraDeviceOpstions && cameraDeviceOpstions.length > 0 && (
        <div className="mb-4">
          <InputLable htmlFor="camera-select" lable="Selecione a câmera" />
          <InputSelect
            id="camera-select"
            value={selectedCamera}
            options={cameraDeviceOpstions}
            onChange={handleCameraChange}
          />
        </div>
      )}
      <div className="relative h-min rounded-md overflow-hidden">
        <video className={className} ref={videoRef} />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-500 transform -translate-y-1/2 pointer-events-none" />
      </div>
      <audio ref={audioRef} src="/sounds/beep.mp3" />
    </React.Fragment>
  );
};

export default React.memo(Scanner);
