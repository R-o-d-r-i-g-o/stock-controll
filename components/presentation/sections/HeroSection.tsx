"use client";

import React from "react";
import MainButton from "../common/MainButton";
import { useRouter } from "next/navigation";

function HeroSection() {
  const router = useRouter();

  return (
    <section id="home" className="flex justify-between flex-col md:flex-row gap-4 items-center">
      <div>
        <p className="font-[850] md:leading-[5.0625rem] text-2xl md:text-[4.375rem] text-darkBlue">Conheça nossas ferramentas totalmente gratuitas</p>
        <p className="text-[1.375rem] font-[500]">Nosso objetivo é fornecer acesso a diversas ferramentas de maneira totalmente gratuita, focando na usabilidade de nossos usuários</p>
        <div className="flex gap-[1.75rem] items-center mt-[3rem]">
          <MainButton text="Dê uma olhada!" classes="shadow-none w-[10.125rem]" action={() => router.push("/menu")} />
          <div className="flex gap-[1.56rem] items-center">
            <img src="/images/fancy_play_icon.png" alt="play icon" />
            <p className="font-bold text-normal">Ver mais</p>
          </div>
        </div>
      </div>
      <div>
        <img src="/images/happy_guy.png" alt="guy with phone surrounded by action icons" />
      </div>
    </section>
  );
}

export default HeroSection;
