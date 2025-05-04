import Header from "../common/Header";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ObjetionSection = () => {
  const faqData = [
    {
      question: "É difícil migrar meus dados atuais para a plataforma?",
      answer:
        "Não se preocupe! Entendemos que a migração de dados pode ser uma preocupação. Oferecemos suporte completo no processo de importação dos seus dados, geralmente através de planilhas ou outros formatos comuns. Nossa equipe estará disponível para auxiliar em cada etapa, garantindo uma transição suave e sem perda de informações importantes para o seu negócio.",
    },
    {
      question: "A plataforma é segura para os dados da minha empresa?",
      answer:
        "A segurança dos seus dados é nossa prioridade máxima. Utilizamos tecnologias de criptografia avançada para proteger suas informações durante a transmissão e armazenamento. Nossos servidores são monitorados 24 horas por dia e implementamos rigorosas políticas de acesso para garantir que seus dados estejam sempre seguros e confidenciais. Realizamos backups regulares para evitar qualquer perda de informação.",
    },
    {
      question: "Preciso de muito conhecimento técnico para usar a plataforma?",
      answer:
        "Absolutamente não! Nossa plataforma foi projetada para ser intuitiva e fácil de usar, mesmo para quem não tem experiência técnica avançada. Oferecemos tutoriais em vídeo, guias passo a passo e um suporte ao cliente dedicado para ajudá-lo em qualquer dúvida. Acreditamos que a tecnologia deve simplificar, não complicar, a sua gestão.",
    },
    {
      question: "O custo da plataforma cabe no meu orçamento?",
      answer:
        "Oferecemos diferentes planos de assinatura que se adaptam às necessidades e ao tamanho do seu negócio, desde pequenas sapatarias até grandes fábricas. Nossos planos são transparentes e oferecem um excelente custo-benefício, considerando a otimização, a redução de desperdícios e o aumento da eficiência que a plataforma proporciona. Além disso, você pode começar com um teste gratuito para experimentar todos os recursos antes de tomar uma decisão.",
    },
    {
      question: "Como a plataforma vai realmente me ajudar a gerenciar meu negócio?",
      answer:
        "Nossa plataforma oferece um controle completo do seu estoque em tempo real, ajudando a evitar rupturas e excessos. Você poderá rastrear matéria-prima, produtos em produção e produtos acabados, otimizar compras, reduzir desperdícios, planejar a produção de forma mais eficiente, gerar relatórios detalhados para tomadas de decisão estratégicas e muito mais. Tudo isso leva a uma gestão mais ágil, redução de custos e aumento da sua lucratividade.",
    },
    {
      question: "E se eu tiver dúvidas ou precisar de suporte após a assinatura?",
      answer:
        "Oferecemos um suporte ao cliente dedicado e eficiente. Nossa equipe está pronta para ajudar você com qualquer dúvida técnica ou funcional que possa surgir, seja por e-mail, telefone ou chat online. Além disso, disponibilizamos uma base de conhecimento completa com artigos, tutoriais e vídeos para que você possa aproveitar ao máximo todos os recursos da plataforma. Nosso sucesso é o seu sucesso!",
    },
  ];

  const expandIcon = <ExpandMoreIcon style={{ color: "white" }} />;

  return (
    <section className="mt-14">
      <Header title="Faq" subtitle="Principais dúvidas" />
      <div className="mt-8 space-y-4">
        {faqData.map((item, index) => (
          <Accordion
            key={index}
            sx={{
              border: "2px solid white",
              borderRadius: "0.5rem",
              backgroundColor: "transparent",
            }}
          >
            <AccordionSummary expandIcon={expandIcon}>
              <Typography variant="subtitle1" className="font-semibold text-white">
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="p-4 rounded-b-md bg-white/10 text-sm text-gray-300">
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </section>
  );
};

export default ObjetionSection;
