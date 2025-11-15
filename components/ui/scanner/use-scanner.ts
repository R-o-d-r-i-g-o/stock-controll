import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useZxing, Result } from "react-zxing";
import { useMediaDevices } from "react-media-devices";

// Doc: https://www.npmjs.com/package/react-zxing

const constraints: MediaStreamConstraints = {
  video: {
    facingMode: "environment",
    width: { ideal: 1280 },
    height: { ideal: 720 },
  },
  audio: false,
};

type UseScannerProps = {
  paused?: boolean;
  onResult?: (sku: string) => void;
  beepEnabled?: boolean;
};

// Debounce function to prevent multiple rapid scans
const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const useScanner = ({ onResult, paused = false, beepEnabled = false }: UseScannerProps) => {
  const [loading, setLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const lastScannedCode = useRef<string>("");
  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [selectedCamera, setSelectedCamera] = useState<string | undefined>();
  const [result, setResult] = useState("");

  const videoDevices = useMediaDevices({ constraints }).devices?.filter((device) => device.kind === "videoinput");

  const cameraDeviceOpstions = useMemo(
    () =>
      videoDevices?.map((device) => ({
        lable: device.label || `Câmera ${device.deviceId.slice(0, 8)}`,
        value: device.deviceId,
      })) || [],
    [videoDevices]
  );

  const handleBeepSound = useCallback(() => {
    if (!audioRef.current || !beepEnabled) return;
    try {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.warn("Could not play beep sound:", err);
      });
    } catch (err) {
      console.warn("Beep sound error:", err);
    }
  }, [beepEnabled]);

  const handleCameraChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedCamera(e.target.value);
    setResult("");
    lastScannedCode.current = "";
  }, []);

  const handleScannerResult = useCallback(
    (res: Result) => {
      const newCode = res.getText().trim();
      if (newCode === "" || newCode === lastScannedCode.current) return;

      // Prevent duplicate scans within 1 second
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }

      lastScannedCode.current = newCode;
      setIsScanning(true);
      setResult(newCode);
      setLoading(false);

      // Reset scanning state after animation
      scanTimeoutRef.current = setTimeout(() => {
        setIsScanning(false);
      }, 500);
    },
    []
  );

  const { ref: videoRef, torch } = useZxing({
    paused,
    deviceId: selectedCamera,
    onDecodeResult: handleScannerResult,
    constraints: {
      video: {
        facingMode: "environment",
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    },
  });

  // Debounced result handler to prevent rapid fire
  const debouncedOnResult = useMemo(
    () =>
      debounce((code: string) => {
        if (onResult) {
          onResult(code);
        }
      }, 300),
    [onResult]
  );

  useEffect(() => {
    if (loading || !result) return;

    debouncedOnResult(result);
    if (beepEnabled) handleBeepSound();
    setLoading(true);

    // Reset after processing
    const resetTimeout = setTimeout(() => {
      setResult("");
      lastScannedCode.current = "";
    }, 1000);

    return () => {
      clearTimeout(resetTimeout);
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
    };
  }, [result, loading, beepEnabled, handleBeepSound, debouncedOnResult]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
      torch.off();
    };
  }, [torch]);

  return {
    videoRef,
    audioRef,
    selectedCamera,
    handleCameraChange,
    cameraDeviceOpstions,
    isScanning,
    loading,
  };
};

export default useScanner;
