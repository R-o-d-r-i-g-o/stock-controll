import React from "react";
import { FieldError } from "react-hook-form";

type InputErrorProps = React.HTMLAttributes<HTMLParagraphElement> & {
  error?: FieldError | Error;
};

const InputError: React.FC<InputErrorProps> = ({
  error,
  className,
  ...rest
}) => {
  if (!error) return null;

  return (
    <p {...rest} className={`text-red-600 text-sm ${className}`}>
      {error.message}
    </p>
  );
};

export default InputError;
