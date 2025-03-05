import React from "react";

const useInputScanner = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isScannerVisible, setScannerVisible] = React.useState(false);

  const handleScannerResult = (result: string) => {
    if (inputRef.current) {
      inputRef.current.value = result;
    }
  };

  const toggleVisibleScanner = () => {
    setScannerVisible((visible) => !visible);
  };

  return {
    inputRef,
    isScannerVisible,
    handleScannerResult,
    toggleVisibleScanner,
  };
};

export default useInputScanner;
