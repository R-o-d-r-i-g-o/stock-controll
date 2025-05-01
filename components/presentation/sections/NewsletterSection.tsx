import React from "react";
import Header from "../common/Header";
import { Input } from "../ui/input";
import MainButton from "../common/MainButton";

function NewsletterSection() {
  return (
    <section id="contato" className="mt-[9rem]">
      <Header title="Nosso blog" subtitle="increva-se em nosso jornal" />
      <div className="flex flex-col md:flex-row  items-center mt-8 md:mt-[3.31rem]">
        <div>
          <img src="/images/newsletter_large_icon.png" alt="large envelop image" className="w-[10rem] md:w-full" />
        </div>
        <div>
          <p className="mb-[1.44rem] text-normal font-semibold">Para receber as noticias do lançamento dos nossos novos utilitários, inscreva seu email abaixo. Ao clicar em &quot;concluir&quot; semanalmente receberá nossa noticiais.</p>

          <Input type="email" placeholder="Seu email vai aqui ..." className="h-[3.8125rem] rounded-[3.0625rem] newsletter-box-shadow" />
          <div className="mt-[3.12rem]">
            <MainButton text="Concluir" width="full_width" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSection;
