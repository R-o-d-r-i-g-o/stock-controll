import React from "react";

type DashTemplateProps = {
  className?: string;
  children: React.ReactNode;
};

const DashTemplate: React.FC<DashTemplateProps> = ({
  children,
  className = "",
}) => (
  <div
    className={`animate-fade-up animate-once animate-duration-300 animate-ease-out ${className}`}
  >
    {children}
  </div>
);

export default DashTemplate;
