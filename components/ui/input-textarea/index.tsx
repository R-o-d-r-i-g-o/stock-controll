import React from "react";
import IdentIcon from "@mui/icons-material/FormatIndentIncrease";
import useInputTextarea from "./use-input-text-area";

type InputTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  React.RefAttributes<HTMLTextAreaElement> & {
    allowIndent?: boolean;
  };

const InputTextarea: React.FC<InputTextareaProps> = ({
  ref,
  className,
  allowIndent,
  ...rest
}) => {
  const { textareaRef, handleIndentJson } = useInputTextarea();

  return (
    <div className="relative">
      <textarea
        {...rest}
        className={`w-full overflow-y-hidden p-3 pr-10 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300 ${className}`}
        ref={(e) => {
          if (typeof ref === "function") ref(e);
          textareaRef.current = e;
        }}
      />
      {allowIndent && (
        <button
          type="button"
          onClick={handleIndentJson}
          className="absolute right-3 top-6 transform -translate-y-1/2 text-gray-500"
        >
          <IdentIcon />
        </button>
      )}
    </div>
  );
};

export default InputTextarea;
