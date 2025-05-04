import React from "react";
import Header from "../common/Header";
import ServiceCard from "../cards/ServiceCard";
import { AcUnitSharp, PlayCircle, BarChart } from "@mui/icons-material";

function ServiceSection() {
  const serviceData = [
    {
      id: 0,
      icon: <AcUnitSharp />,
      title: "Missão",
      description: "Simplificar a gestão de sua sapataria, oferecendo um ERP moderno que otimiza processos essenciais como controle de estoque, vendas e relacionamento com clientes.",
    },
    {
      id: 1,
      icon: <PlayCircle />,
      title: "Visão",
      description: "Ser a solução de ERP mais confiável e eficiente para sapatarias, com funcionalidades sempre atualizadas e um sistema robusto para impulsionar o crescimento do seu negócio.",
    },
    {
      id: 2,
      icon: <BarChart />,
      title: "Valores",
      description: "Acreditamos no poder do acesso facilitado à tecnologia. Por isso, oferecemos um ERP, seguindo os princípios de transparência e colaboração que valorizamos em nossa comunidade de usuários.",
    },
  ];

  return (
    <section id="about" className="pt-14">
      <Header title="serviço" subtitle="Nossa visão & objetivos" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3.56rem] justify-around mt-14">
        {serviceData.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </section>
  );
}

export default ServiceSection;
