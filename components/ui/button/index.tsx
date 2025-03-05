import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

const Button: React.FC<ButtonProps> = ({ text, className, ...rest }) => (
  <button
    {...rest}
    className={`w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ${className}`}
  >
    {text}
  </button>
);

export default Button;
