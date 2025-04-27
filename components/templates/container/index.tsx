import React from "react";

type ContainerTemplateProps = React.HTMLProps<HTMLDivElement> & {
  display?: "large" | "small" | "minimum";
};

const contaninerTemplateSize = {
  large: "max-w-4xl w-full",
  small: "max-w-md w-full",
  minimum: "max-w-xs w-full",
};

const ContainerTemplate: React.FC<ContainerTemplateProps> = ({ display = "large", children, className, ...rest }) => (
  <div {...rest} className={`bg-white p-6 sm:p-10 rounded-lg shadow-lg mx-5 sm:mx-0 animate-fade-up animate-once animate-duration-300 animate-ease-out ${contaninerTemplateSize[display]} ${className}`}>
    {children}
  </div>
);

export default ContainerTemplate;
