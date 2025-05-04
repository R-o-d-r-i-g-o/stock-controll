"use client";

import React from "react";
import Slider from "react-slick";
import Header from "../common/Header";
import TestimonialCard from "../cards/TestimonialCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TestimonialSection() {
  const appReviewData = [
    {
      id: 0,
      imageUrl: "/images/rayhan.jpg",
      reviewerName: "Rayhan Curran (Proprietário de Sapataria)",
      review: "Finalmente tenho controle total do meu estoque de sapatos! Consigo saber exatamente quantos pares de cada modelo e tamanho eu tenho, evitando vendas perdidas por falta de produto e otimizando meus pedidos aos fornecedores.",
    },
    {
      id: 1,
      imageUrl: "/images/kayley.jpg",
      reviewerName: "Kayley Frame (Gerente de Boutique de Calçados)",
      review: "O sistema de controle de estoque nos ajudou a organizar nosso estoque de forma impecável. Agora é muito mais fácil encontrar um tamanho específico para um cliente e garantir que não haja erros nos pedidos, o que melhora a experiência de compra.",
    },
    {
      id: 2,
      imageUrl: "/images/gene.jpg",
      reviewerName: "Gene Whitfield (Consultor de Sapatarias Multimarcas)",
      review: "Para sapatarias com muitas marcas e modelos, um bom controle de estoque é essencial. Essa plataforma oferece uma maneira simples e eficiente de gerenciar a entrada e saída de calçados, facilitando a organização e a tomada de decisões de compra.",
    },
    {
      id: 3,
      imageUrl: "/images/alan.jpg",
      reviewerName: "Allan Kim (Empreendedor de Sapataria Online)",
      review: "Com o controle de estoque integrado à minha loja online, nunca mais vendi um sapato que não tinha! O sistema me dá uma visão clara da disponibilidade dos produtos, evitando frustrações dos clientes e garantindo que meu estoque esteja sempre atualizado.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 250,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="mt-16 pt-10">
      <Header title="testemunhas" subtitle="O que nossos usuários comentam" />
      <div className="mt-8 mx-auto max-w-sm md:max-w-screen-md lg:max-w-screen-lg">
        <Slider {...settings}>
          {appReviewData.map((review) => (
            <div key={review.id}>
              <TestimonialCard imageUrl={review.imageUrl} review={review.review} reviewerName={review.reviewerName} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default TestimonialSection;
