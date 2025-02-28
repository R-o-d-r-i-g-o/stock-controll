import React from "react";

type BackgroundProps = {
  children?: React.ReactNode;
};

const Background: React.FC<BackgroundProps> = (data) => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
    {data.children}
  </div>
);

export default Background;
