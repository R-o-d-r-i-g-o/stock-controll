import React from "react";

type InputLableProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  lable: string;
};

const InputLable: React.FC<InputLableProps> = ({
  lable,
  className,
  ...rest
}) => (
  <label
    {...rest}
    className={`block text-sm font-medium text-gray-600 ${className}`}
  >
    {lable}
  </label>
);

export default InputLable;
