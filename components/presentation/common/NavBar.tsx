"use client";

import { useState } from "react";
import { X } from "lucide-react";
import MainButton from "./MainButton";
import Link from "next/link";

function NavBar() {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="md:sticky md:top-0   md:shadow-none z-20 ">
      {/* DESKTOP */}
      <div className=" hidden lg:block animate-in fade-in zoom-in bg-white p-4">
        <div className="flex justify-between md:mx-[9rem] items-center">
          <Link href="/">
            <img src="/images/logo.png" alt="logo" className="w-[50%]" />
          </Link>
          <div className="flex gap-[20px] xl:gap-[50px] text-[16px] items-center select-none">
            <Link href="/#home" className={`hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray`}>
              Home
            </Link>
            <Link href="/#sobre" className={`hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray`}>
              Sobre
            </Link>
            <Link href="/#contato" className={`hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray`}>
              Contato
            </Link>
          </div>
          <div className="flex items-center gap-[40px] select-none">
            <p className={`hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray`}>Entrar</p>
            <MainButton text="Cadastrar" classes="shadow-none" />
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div className={` block lg:hidden shadow-sm  fixed top-0 w-full z-[999] bg-white py-4 animate-in fade-in zoom-in  ${menu ? " bg-primary py-2" : ""} `}>
        <div className="flex justify-between mx-[10px]">
          <div className="flex gap-[50px] text-[16px] items-center select-none">
            <Link href="/">
              <img src="/images/logo.png" alt="logo" className="w-[7rem]" />
            </Link>
          </div>
          <div className="flex items-center gap-[40px]">{menu ? <X className="cursor-pointer animate-in fade-in zoom-in text-black" onClick={toggleMenu} /> : <img src="/svgs/hamburger.svg" alt="logo" className="cursor-pointer animate-in fade-in zoom-in" onClick={toggleMenu} />}</div>
        </div>
        {menu ? (
          <div className="my-8 select-none animate-in slide-in-from-right">
            <div className="flex flex-col gap-8 mt-8 mx-4">
              <Link href="/#home" className={`hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray`}>
                Home
              </Link>
              <Link href="/#sobre" className={`hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray`}>
                Sobre
              </Link>
              <Link href="/#contato" className={`hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray`}>
                Contato
              </Link>

              <div className="flex flex-col gap-[40px] select-none">
                <p className={`hover:text-primary cursor-pointer flex items-center gap-2  font-[500] text-gray`}>Entrar</p>
                <MainButton text="Cadastrar" classes="shadow-none" />
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
