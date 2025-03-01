import React from "react";

type TitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  text: string;
};

const Title: React.FC<TitleProps> = ({ className, text, ...rest }) => (
  <h2
    {...rest}
    className={`font-bold text-2xl sm:text-3xl text-gray-800 ${className}`}
  >
    {text}
  </h2>
);

export default Title;
