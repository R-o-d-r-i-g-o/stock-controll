import React from "react";
import { Separator } from "../ui/separator";

function FooterSection() {
  return (
    <section className="flex flex-col gap-[1.9rem] w-full mt-[10.44rem]">
      <div className="flex flex-col md:flex-row gap-8 justify-between">
        <div>
          <img src="/images/logo.png" alt="footer logo" className="w-[60%]" />
        </div>
        <div className="text-lightBlue text-[1rem] font-serif">© {new Date().getFullYear()} Meus Utilitários. Todos os direitos reservados.</div>
        <div className="flex gap-4">
          <p className="text-lightBlue text-[1rem]">Como funciona?</p>
          <p className="text-lightBlue text-[1rem]">Entrar</p>
        </div>
      </div>
      <Separator />
      <div className="pb-[2.56rem]">
        <p className="text-customGray text-center">Com o objetivo de fornecer ferramentas gratuitas ao usuário, mostramos alguns anúncios em nosso site. Esperamos que isso não te incomode.</p>
      </div>
    </section>
  );
}

export default FooterSection;
