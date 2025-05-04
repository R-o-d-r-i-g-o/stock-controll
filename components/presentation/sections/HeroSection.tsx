import Link from "next/link";
import Image from "next/image";
import MainButton from "../common/MainButton";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

const HeroSection = () => (
  <section className="flex justify-between flex-col md:flex-row gap-4 items-center pt-24 lg:pt-6">
    <div>
      <h1 className="font-extrabold md:leading-[5rem] text-2xl md:text-6xl">Um passo de cada vez rumo a gestão ágil e eficiente!</h1>
      <p className="text-lg mt-4 md:text-xl font-medium text-gray-600">Criado para sapatarias e fábricas! Otimize seu estoque, reduza desperdícios e acelere sua produção com tecnologia de ponta</p>
      <div className="flex gap-6 items-center mt-12">
        <Link href="/register">
          <MainButton text="Criar conta gratis!" classes="shadow-none w-[10rem]" />
        </Link>
        <div className="flex gap-2 items-center cursor-pointer">
          <PlayCircleFilledIcon style={{ fontSize: 30 }} />
          <p className="font-bold text-lg">Ver mais</p>
        </div>
      </div>
    </div>
    <div>
      <Image src="/images/happy_guy.png" alt="Pessoa feliz com ícones de ação" width={1100} height={1100} />
    </div>
  </section>
);

export default HeroSection;
