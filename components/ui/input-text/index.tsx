import React from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useInputPassword from "./use-input-password";

type InputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isPassword?: boolean;
};

const InputText: React.FC<InputTextProps> = ({
  className,
  isPassword,
  ...rest
}) => {
  const { showPassword, handleToggleVisibility } = useInputPassword();

  return (
    <div className="relative">
      <input
        {...rest}
        type={isPassword && !showPassword ? "password" : "text"}
        className={`w-full p-3 pr-10 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300 ${className}`}
      />

      {isPassword && (
        <button
          type="button"
          onClick={handleToggleVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </button>
      )}
    </div>
  );
};

export default InputText;
