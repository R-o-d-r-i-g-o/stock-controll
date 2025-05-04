import React from "react";
import Header from "../common/Header";
import MainButton from "../common/MainButton";

function SpecialOffer() {
  return (
    <section id="oferta" className="mt-14 pt-4 bg-gray-50 rounded-lg shadow-md">
      <div className="px-6 md:px-10 lg:px-16 py-8">
        <Header title="Experimente Grátis!" subtitle="30 dias para um teste gratuíto" />
        <div className="mt-8 md:mt-[3rem] text-center md:text-left">
          <p className="mb-5 text-lg leading-relaxed text-gray-800">
            Aproveite nossa <span className="font-semibold text-green-600">oferta especial de lançamento</span>! Adquira qualquer um de nossos planos e utilize o sistema ERP completo para sapatarias <span className="font-extrabold text-blue-600 text-xl">totalmente grátis por 30 dias</span>.
          </p>
          <p className="text-gray-700 mb-7 leading-relaxed">
            Descubra como nosso software pode otimizar suas vendas, gerenciar seu estoque com eficiência e melhorar o relacionamento com seus clientes <span className="font-medium">sem nenhum custo inicial</span>.
          </p>
          <div className="mt-6 flex justify-center">
            <MainButton text="Conhecer os Planos" width="md:w-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpecialOffer;
