import Link from "next/link";
import React from "react";
import Header from "../common/Header";
import LottieHandler from "../ui/lottie-handler";
import carrierSuccess from "@/public/animations/carrier-success.json";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

function SpecialOffer() {
  return (
    <section id="offer" className="relative mt-14 py-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative bg-white/80 backdrop-blur-sm border-2 border-white/50 rounded-3xl shadow-2xl overflow-hidden">
        <div className="px-6 md:px-10 lg:px-16 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <LottieHandler lottie={carrierSuccess} height={350} maxWidth={350} minWidth={"60%"} />
            </div>
          </div>
          <div className="text-center md:text-left space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border border-green-200 mb-4">
              <LocalOfferIcon className="text-green-600 text-sm" />
              <span className="text-sm font-semibold text-green-700">Oferta Especial de Lançamento</span>
            </div>
            <Header title="Experimente Grátis!" subtitle="30 dias para um teste gratuito" />
            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-gray-700">
                Aproveite nossa oferta especial de lançamento! Adquira qualquer um de nossos planos e utilize o sistema ERP completo para sapatarias totalmente grátis por 30 dias.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Descubra como nosso software pode otimizar suas vendas, gerenciar seu estoque com eficiência e melhorar o relacionamento com seus clientes sem nenhum custo inicial.
              </p>
            </div>
            <Link href="/register" className="inline-block mt-6 group">
              <button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span>Quero começar agora!</span>
                <ArrowForwardIcon className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpecialOffer;
