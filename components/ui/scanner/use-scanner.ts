import React, { useState, useEffect, useRef, memo } from "react";
import { useZxing, Result } from "react-zxing";
import { useMediaDevices } from "react-media-devices";

// Doc: https://www.npmjs.com/package/react-zxing

const constraints: MediaStreamConstraints = {
  video: true,
  audio: false,
};

type UseScannerProps = {
  paused?: boolean;
  onResult?: (sku: string) => void;
  beepEnabled?: boolean;
};

const useScanner = ({
  onResult,
  paused = false,
  beepEnabled = false,
}: UseScannerProps) => {
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [selectedCamera, setSelectedCamera] = useState<string | undefined>();
  const [result, setResult] = useState("");

  const handleVideoDeviceOptions = () => {
    const videoDevices = useMediaDevices({ constraints }).devices?.filter(
      (device) => device.kind === "videoinput"
    );

    return videoDevices?.map((device) => ({
      lable: device.label,
      value: device.deviceId,
    }));
  };

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

  const { ref: videoRef, torch } = useZxing({
    paused,
    deviceId: selectedCamera,
    onDecodeResult: handleScannerResult,
  });

  useEffect(() => {
    if (loading) return;
    if (onResult) onResult(result);
    if (beepEnabled) handleBeepSound();
    setLoading(true);

    return () => {
      torch.off();
    };
  }, [result, loading]);

  return {
    videoRef,
    audioRef,
    selectedCamera,
    handleCameraChange,
    cameraDeviceOpstions: handleVideoDeviceOptions(),
  };
};

export default useScanner;
