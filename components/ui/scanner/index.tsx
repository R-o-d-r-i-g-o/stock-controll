"use client";

import React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
  const { videoRef, audioRef, selectedCamera, handleCameraChange, cameraDeviceOpstions, isScanning, loading } = useScanner(rest);

  return (
    <React.Fragment>
      {cameraDeviceOpstions && cameraDeviceOpstions.length > 1 && (
        <div className="mb-4">
          <InputLable htmlFor="camera-select" lable="Selecione a câmera" />
          <InputSelect id="camera-select" value={selectedCamera} options={cameraDeviceOpstions} onChange={handleCameraChange} />
        </div>
      )}
      <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-indigo-200 bg-black">
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <video
            className={`w-full h-full object-cover ${className || ""}`}
            ref={videoRef}
            autoPlay
            playsInline
            muted
          />
          
          {/* Scanning overlay */}
          {isScanning && (
            <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center z-10 animate-pulse">
              <div className="bg-white rounded-full p-4 shadow-lg">
                <CheckCircleIcon className="text-green-600 text-4xl" />
              </div>
            </div>
          )}

          {/* Scanning frame guide */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-3/4 h-3/4 border-4 border-indigo-400 rounded-lg shadow-lg">
              {/* Corner indicators */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-indigo-500 rounded-tl-lg" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-indigo-500 rounded-tr-lg" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-indigo-500 rounded-bl-lg" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-indigo-500 rounded-br-lg" />
              
              {/* Scanning line */}
              <div 
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
                style={{
                  animation: "scanLine 2s linear infinite",
                }}
              />
            </div>
          </div>

          {/* Loading indicator */}
          {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
              <div className="text-white text-center">
                <CameraAltIcon className="text-4xl mb-2 animate-pulse" />
                <p className="text-sm">Iniciando câmera...</p>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="absolute bottom-4 left-0 right-0 text-center z-10">
            <p className="text-white text-sm bg-black bg-opacity-60 px-4 py-2 rounded-lg inline-block">
              Posicione o código dentro do quadro
            </p>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src="/sounds/beep.mp3" preload="auto" />
      <style jsx global>{`
        @keyframes scanLine {
          0% {
            top: 0;
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            top: 100%;
            opacity: 1;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

export default React.memo(Scanner);
