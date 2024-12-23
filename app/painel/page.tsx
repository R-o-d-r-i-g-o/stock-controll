const HomePage = () => (
  <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl">
    {/* notas sobre o uso do sistema */}
    <h2 className="text-2xl font-bold mb-4">Controle de Estoque - Sapataria</h2>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>Cadastro de Produtos:</strong> Adicionar, editar e excluir sapatos com informações detalhadas.</li>
      <li><strong>Controle de Quantidade:</strong> Acompanhe o estoque em tempo real e ajuste automaticamente após vendas.</li>
      <li><strong>Relatórios de Vendas:</strong> Geração de relatórios mensais e diários para análise de desempenho.</li>
      <li><strong>Notificação de Estoque Baixo:</strong> Alertas automáticos para reposição de estoque.</li>
      <li><strong>Busca e Filtro de Produtos:</strong> Facilite a pesquisa por categoria, tamanho, cor e preço.</li>
      <li><strong>Controle de Fornecedores:</strong> Cadastre fornecedores e mantenha o estoque sempre abastecido.</li>
    </ul>
    {/* notas sobre a segurança no sistema */}
    <h2 className="text-2xl font-bold mb-4 mt-8">Notas de Segurança</h2>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>Senha Forte:</strong> Utilize uma combinação de letras, números e caracteres especiais.</li>
      <li><strong>Autenticação de Dois Fatores:</strong> Ative a 2FA para proteger sua conta contra acessos não autorizados.</li>
      <li><strong>Logout em Dispositivos Públicos:</strong> Sempre faça logout em dispositivos compartilhados ou públicos.</li>
    </ul>
  </div>
)

export default HomePage;