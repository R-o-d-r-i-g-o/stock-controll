import React from "react";
import Header from "../common/Header";
import ServiceCard from "../cards/ServiceCard";

function ServiceSection() {
  const serviceData = [
    {
      id: 0,
      iconUrl: "/images/activity_icon.png",
      title: "Missão",
      description: "Buscamos ofertar de maneira totalmente gratuíta as ferramentas que julgamos importantes para desempenho de funções básicas de trabalho.",
    },
    {
      id: 1,
      iconUrl: "/images/video_icon.png",
      title: "Visão",
      description: "Como buscamos por confiabilidade, oferecemos um serviço de confiança e com funcionalidades profundamente testadas e atualizadas.",
    },
    {
      id: 2,
      iconUrl: "/images/chart_icon.png",
      title: "Valores",
      description: "Presamos muito pelo protocolo do software livre. Por isso o seguimos todos os padrões que julgamos interessantes da comunidade que os mantem.",
    },
  ];
  return (
    <section id="sobre">
      <Header title="serviço" subtitle="Nossa visão & objetivos" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-[3.56rem] justify-around mt-8 md:mt-[6.75rem]">
        {serviceData.map((service) => (
          <ServiceCard key={service.id} title={service.title} description={service.description} iconUrl={service.iconUrl} />
        ))}
      </div>
    </section>
  );
}

export default ServiceSection;
