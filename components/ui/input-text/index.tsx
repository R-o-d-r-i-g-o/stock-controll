import React from "react";

import Visibility from "@mui/icons-material/Visibility";
import CropFreeIcon from "@mui/icons-material/CropFree";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Scanner from "@/components/ui/scanner";
import Container from "@/components/templates/container";
import useInputScanner from "./use-input-scanner";
import useInputPassword from "./use-input-password";

type InputTextProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.RefAttributes<HTMLInputElement> & {
    isPassword?: boolean;
    isScanner?: boolean;
  };

const InputText: React.FC<InputTextProps> = ({ ref, type = "text", className, isScanner, isPassword, ...rest }) => {
  const { showPassword, handleToggleVisibility } = useInputPassword();

  const { inputRef, isScannerVisible, handleScannerResult, toggleVisibleScanner } = useInputScanner();

  const isPasswordContent = (
    <button type="button" onClick={handleToggleVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
      {showPassword ? <VisibilityOff /> : <Visibility />}
    </button>
  );

  const isScannerContent = (
    <React.Fragment>
      <button type="button" onClick={toggleVisibleScanner} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <CropFreeIcon />
      </button>

      {isScannerVisible && (
        <div onClick={toggleVisibleScanner} className="fixed inset-0 bg-gray-500 bg-opacity-70 flex justify-center items-center z-50">
          <Container className="!p-4" display="minimum" onClick={(e) => e.stopPropagation()}>
            <Scanner beepEnabled onResult={handleScannerResult} />
          </Container>
        </div>
      )}
    </React.Fragment>
  );

  return (
    <div className="relative">
      <input
        {...rest}
        type={isPassword && !showPassword ? "password" : type}
        className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300 ${className}`}
        ref={(e) => {
          if (typeof ref === "function") ref(e);
          inputRef.current = e;
        }}
      />
      {isPassword && isPasswordContent}
      {isScanner && isScannerContent}
    </div>
  );
};

export default InputText;
