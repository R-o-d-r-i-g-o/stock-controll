import React from "react";

type BackgroundProps = React.HTMLProps<HTMLDivElement> & {
  type?: "error" | "default";
  children?: React.ReactNode;
};

const backgroundColorMap = {
  default: "from-blue-500 via-indigo-500 to-purple-500",
  error: "from-red-500 via-yellow-500 to-orange-500",
};

const Background: React.FC<BackgroundProps> = ({
  className,
  children,
  type = "default",
}) => (
  <div
    className={`flex items-center justify-center min-h-screen bg-gradient-to-r ${backgroundColorMap[type]} ${className}`}
  >
    {children}
  </div>
);

export default Background;
