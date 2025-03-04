import React from "react";
import IdentIcon from "@mui/icons-material/FormatIndentIncrease";
import useInputTextarea from "./use-input-text-area";

type InputTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  allowIndent?: boolean;
};

const InputTextarea: React.FC<InputTextareaProps> = ({
  id,
  className,
  allowIndent = false,
  ...rest
}) => {
  const { handleIndentJson } = useInputTextarea({ fieldId: id });

  return (
    <div className="relative">
      <textarea
        {...rest}
        className={`w-full overflow-y-hidden p-3 pr-10 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300 ${className}`}
        id={id}
      />
      {allowIndent && (
        <button
          type="button"
          onClick={handleIndentJson}
          className="absolute top-2 p-1 right-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 focus:outline-none"
        >
          <IdentIcon fontSize="small" />
        </button>
      )}
    </div>
  );
};

export default InputTextarea;
