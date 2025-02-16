import React from "react";

// docs: https://www.tailwindcss-animated.com/configurator.html

type ZoomAnimateBlockProps = {
  className?: string;
  children: React.ReactNode;
};

const ZoomAnimateBlock = ({
  children,
  className = "",
}: ZoomAnimateBlockProps) => (
  <div
    className={`animate-fade-up animate-once animate-duration-300 animate-ease-out ${className}`}
  >
    {children}
  </div>
);

export { ZoomAnimateBlock };
