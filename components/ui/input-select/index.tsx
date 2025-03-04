import React from "react";

type InputSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: {
    lable: number | string;
    value: number | string;
  }[];
};

const InputSelect: React.FC<InputSelectProps> = ({
  options,
  className,
  ...rest
}) => {
  return (
    <select
      {...rest}
      className={`w-full mt-2 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 transition duration-300 ${className}`}
    >
      {!options ||
        (options.length < 1 && (
          <option disabled>Nenhuma opção disponível no momento</option>
        ))}
      {options?.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.lable}
        </option>
      ))}
    </select>
  );
};

export default InputSelect;
