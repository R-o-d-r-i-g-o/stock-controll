import Link from "next/link";
import Image from "next/image";
import MainButton from "../common/MainButton";

function HeroSection() {
  return (
    <section id="home" className="flex justify-between flex-col md:flex-row gap-4 items-center">
      <div>
        <h1 className="font-extrabold md:leading-[5rem] text-2xl md:text-6xl">Um passo de cada vez rumo a gestão ágil e eficiente!</h1>
        <p className="text-lg md:text-xl font-medium text-gray-600">Criado para sapatarias e fábricas! Otimize seu estoque, reduza desperdícios e acelere sua produção com tecnologia de ponta</p>
        <div className="flex gap-6 items-center mt-12">
          <Link href="/register">
            <MainButton text="Criar conta gratis!" classes="shadow-none w-[10rem]" />
          </Link>
          <div className="flex gap-4 items-center cursor-pointer">
            <Image src="/images/fancy_play_icon.png" alt="play icon" width={50} height={50} />
            <p className="font-bold text-lg">Ver mais</p>
          </div>
        </div>
      </div>
      <div>
        <Image src="/images/happy_guy.png" alt="Pessoa feliz com ícones de ação" width={1100} height={1100} />
      </div>
    </section>
  );
}

export default HeroSection;
