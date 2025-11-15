import Link from "next/link";
import Image from "next/image";
import MainButton from "../common/MainButton";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InventoryIcon from "@mui/icons-material/Inventory";
import SpeedIcon from "@mui/icons-material/Speed";

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 pt-8 md:pt-16 pb-16 overflow-hidden">
    {/* Background decorative elements */}
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    </div>

    <div className="flex-1 z-10 space-y-8">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full border border-indigo-200">
        <TrendingUpIcon className="text-indigo-600 text-sm" />
        <span className="text-sm font-semibold text-indigo-700">Solução completa para gestão de estoque</span>
      </div>

      {/* Main heading */}
      <h1 className="font-extrabold leading-tight text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
        Um passo de cada vez rumo a{" "}
        <span className="relative inline-block text-purple-800">
          <span className="relative z-10">gestão ágil</span>
          <span className="absolute bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-indigo-400/50 to-purple-400/50 -rotate-1 rounded-sm" />
        </span>{" "}
        e eficiente!
      </h1>

      {/* Description */}
      <p className="text-lg md:text-xl lg:text-2xl font-medium text-gray-600 max-w-2xl leading-relaxed">
        Criado para sapatarias e fábricas! Otimize seu estoque, reduza desperdícios e acelere sua produção com tecnologia de ponta.
      </p>

      {/* Features highlights */}
      <div className="flex flex-wrap gap-4 md:gap-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm">
          <InventoryIcon className="text-indigo-600" />
          <span className="text-sm font-medium text-gray-700">Controle Total</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm">
          <SpeedIcon className="text-purple-600" />
          <span className="text-sm font-medium text-gray-700">Rápido e Eficiente</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-4">
        <Link href="/register" className="group">
          <button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <span>Criar conta grátis</span>
            <ArrowForwardIcon className="group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
        <button className="flex items-center gap-2 px-6 py-4 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 group">
          <PlayCircleFilledIcon className="text-indigo-600 group-hover:scale-110 transition-transform" style={{ fontSize: 32 }} />
          <span>Ver demonstração</span>
        </button>
      </div>
    </div>

    {/* Image section */}
    <div className="flex-1 z-10 relative">
      <div className="relative">
        {/* Decorative circle behind image */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl scale-110" />
        
        {/* Image container with modern styling */}
        <div className="relative transform hover:scale-105 transition-transform duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl blur-2xl" />
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
            <Image
              src="/images/happy_guy.png"
              alt="Pessoa feliz com ícones de ação"
              width={1100}
              height={1100}
              className="object-contain w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Floating badges */}
        <div className="absolute -top-4 -right-4 md:right-12 bg-white rounded-2xl shadow-xl p-4 border-2 border-indigo-100 animate-bounce-slow">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-gray-700">Sistema Online</span>
          </div>
        </div>
        <div className="absolute -bottom-4 -left-4 md:-left-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-xl p-4 animate-bounce-slow-delayed">
          <div className="flex items-center gap-2">
            <TrendingUpIcon className="text-sm" />
            <span className="text-xs font-semibold">+99% Satisfação</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
