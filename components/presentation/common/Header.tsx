import React from "react";

interface IProps {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: IProps) => (
  <div className="flex flex-col items-center gap-5 text-center">
    <p className="tracking-widest uppercase text-sm font-bold text-gray-300">{title}</p>
    <p className="text-4xl md:text-[3.5rem] font-extrabold bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-600 text-transparent bg-clip-text animate-pulse drop-shadow-[2px_2px_8px_rgba(255,255,255,0.9)]" style={{ lineHeight: "1.2" }}>
      {subtitle}
    </p>
  </div>
);

export default Header;
