import { ZoomAnimateBlock } from "@/components/ui";

const HomePage = () => (
  <ZoomAnimateBlock className="bg-gray-50 p-10 rounded-lg shadow-lg w-full max-w-4xl">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">
      Funcionalidades do Sistema
    </h2>
    <ul className="list-disc pl-5 space-y-2 text-gray-700">
      <li>
        <strong className="text-blue-600">Cadastro de Produtos:</strong>{" "}
        Adicionar, editar e excluir sapatos com informações detalhadas.
      </li>
      <li>
        <strong className="text-blue-600">Controle de Quantidade:</strong>{" "}
        Acompanhe o estoque em tempo real e ajuste automaticamente após vendas.
      </li>
      <li>
        <strong className="text-blue-600">Relatórios de Vendas:</strong> Geração
        de relatórios mensais e diários para análise de desempenho.
      </li>
      <li>
        <strong className="text-blue-600">Notificação de Estoque Baixo:</strong>{" "}
        Alertas automáticos para reposição de estoque.
      </li>
      <li>
        <strong className="text-blue-600">Busca e Filtro de Produtos:</strong>{" "}
        Facilite a pesquisa por categoria, tamanho, cor e preço.
      </li>
      <li>
        <strong className="text-blue-600">Controle de Fornecedores:</strong>{" "}
        Cadastre fornecedores e mantenha o estoque sempre abastecido.
      </li>
    </ul>

    <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">
      Notas de Segurança
    </h2>
    <ul className="list-disc pl-5 space-y-2 text-gray-700">
      <li>
        <strong className="text-red-600">Senha Forte:</strong> Utilize uma
        combinação de letras, números e caracteres especiais.
      </li>
      <li>
        <strong className="text-red-600">Autenticação de Dois Fatores:</strong>{" "}
        Ative a 2FA para proteger sua conta contra acessos não autorizados.
      </li>
      <li>
        <strong className="text-red-600">
          Logout em Dispositivos Públicos:
        </strong>{" "}
        Sempre faça logout em dispositivos compartilhados ou públicos.
      </li>
    </ul>
  </ZoomAnimateBlock>
);

export default HomePage;
