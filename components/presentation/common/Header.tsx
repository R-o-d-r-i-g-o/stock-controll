import React from "react";

interface IProps {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: IProps) => (
  <div className="flex flex-col items-center gap-5 text-center">
    <p className="tracking-widest uppercase text-sm font-bold text-gray-300">{title}</p>
    <p className="text-4xl md:text-[3.25rem] font-extrabold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text animate-pulse drop-shadow-[2px_2px_6px_rgba(255,255,255,0.8)]">{subtitle}</p>
  </div>
);

export default Header;
