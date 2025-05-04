import Link from "next/link";
import React from "react";
import Header from "../common/Header";
import MainButton from "../common/MainButton";
import LottieHandler from "../ui/lottie-handler";
import carrierSuccess from "@/public/animations/carrier-success.json";

function SpecialOffer() {
  return (
    <section id="oferta" className="mt-14 pt-4 bg-gray-50 rounded-lg shadow-md">
      <div className="px-6 md:px-10 lg:px-16 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <LottieHandler lottie={carrierSuccess} height={300} maxWidth={300} minWidth={"60%"} />
        </div>
        <div className="text-center md:text-left">
          <Header title="Experimente Grátis!" subtitle="30 dias para um teste gratuíto" />
          <div className="mt-8 md:mt-[3rem]">
            <p className="mb-5 text-lg leading-relaxed text-gray-800">
              Aproveite nossa <span className="font-semibold text-green-600">oferta especial de lançamento</span>! Adquira qualquer um de nossos planos e utilize o sistema ERP completo para sapatarias <span className="font-extrabold text-blue-600 text-xl">totalmente grátis por 30 dias</span>.
            </p>
            <p className="text-gray-700 mb-7 leading-relaxed">
              Descubra como nosso software pode otimizar suas vendas, gerenciar seu estoque com eficiência e melhorar o relacionamento com seus clientes <span className="font-medium">sem nenhum custo inicial</span>.
            </p>
            <Link href="/register" className="mt-6 flex justify-center md:justify-start">
              <MainButton text="Quero começar agora!" width="md:w-auto w-full" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpecialOffer;
