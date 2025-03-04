import Title from "@/components/ui/title";
import TopicList from "@/components/ui/topic-list";
import Container from "@/components/templates/container";

const HomePage = () => {
  const featuresNotes = [
    {
      title: "Cadastro de Calçados",
      description:
        "Adicionar, editar e excluir sapatos com informações detalhadas.",
      titleStyle: "text-blue-600",
    },
    {
      title: "Controle de Quantidade",
      description:
        "Acompanhe o estoque em tempo real e ajuste automaticamente após vendas.",
      titleStyle: "text-blue-600",
    },
    {
      title: "Relatórios de Vendas",
      description:
        "Geração de relatórios mensais e diários para análise de desempenho.",
      titleStyle: "text-blue-600",
    },
    {
      title: "Notificação de Estoque Baixo",
      description: "Alertas automáticos para reposição de estoque.",
      titleStyle: "text-blue-600",
    },
    {
      title: "Busca e Filtro de Calçados",
      description:
        "Facilite a pesquisa por nome, tamanho, etiqueta cor e preço.",
      titleStyle: "text-blue-600",
    },
    {
      title: "Controle de Fornecedores",
      description:
        "Cadastre fornecedores e mantenha o estoque sempre abastecido.",
      titleStyle: "text-blue-600",
    },
  ];

  const securityNotes = [
    {
      title: "Senha Forte",
      description:
        "Utilize uma combinação de letras, números e caracteres especiais.",
      titleStyle: "text-red-600",
    },
    {
      title: "Autenticação de Dois Fatores",
      description:
        "Ative a 2FA para proteger sua conta contra acessos não autorizados.",
      titleStyle: "text-red-600",
    },
    {
      title: "Logout em Dispositivos Públicos",
      description:
        "Sempre faça logout em dispositivos compartilhados ou públicos.",
      titleStyle: "text-red-600",
    },
  ];

  return (
    <Container>
      <Title className="mb-4" text="Funcionalidades do Sistema" />
      <TopicList items={featuresNotes} />
      <Title className="my-4" text="Notas de Segurança" />
      <TopicList items={securityNotes} />
    </Container>
  );
};

export default HomePage;
