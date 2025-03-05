type PrismaErrorMessage = {
  [key: string]: {
    message: string;
    status: number;
  };
};

const prismaErrorMessages: PrismaErrorMessage = {
  P1000: {
    message:
      "Erro de autenticação: Não foi possível conectar ao banco de dados.",
    status: 401, // (Unauthorized: Quando as credenciais ou autenticação falham)
  },
  P1001: {
    message: "Erro de conexão: Não conseguimos conectar ao banco de dados.",
    status: 502, // (Bad Gateway: Problema de comunicação entre servidores, geralmente devido a falhas na conexão)
  },
  P1002: {
    message:
      "Erro de tempo de conexão: Tempo limite ao tentar conectar ao banco de dados.",
    status: 504, // (Gateway Timeout: Quando o servidor não responde a tempo)
  },
  P1003: {
    message: "Banco de dados não encontrado.",
    status: 404, // (Not Found: Quando um recurso não é encontrado no banco de dados)
  },
  P1008: {
    message:
      "Erro de tempo de execução: A operação ultrapassou o tempo limite.",
    status: 408, // (Request Timeout: Quando a requisição demora demais para ser completada)
  },
  P1009: {
    message: "Banco de dados já existe.",
    status: 409, // (Conflict: Quando há um conflito, como uma violação de chave única)
  },
  P1010: {
    message:
      "Acesso negado: Você não tem permissão para acessar este banco de dados.",
    status: 403, // (Forbidden: Quando o usuário não tem permissão para acessar o recurso)
  },
  P1011: {
    message:
      "Erro TLS: Não foi possível estabelecer uma conexão segura com o banco de dados.",
    status: 500, // (Internal Server Error: Erros gerais do servidor ou problemas inesperados)
  },
  P1012: {
    message:
      "Erro de validação de esquema: O esquema do banco de dados não é válido.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2000: {
    message:
      "Valor muito longo para o campo: O valor fornecido ultrapassou o limite do campo.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2001: {
    message:
      "Registro não encontrado: O item solicitado não existe no banco de dados.",
    status: 404, // (Not Found: Quando um recurso não é encontrado no banco de dados)
  },
  P2002: {
    message:
      "Falha na restrição única: Tentativa de inserir um valor que já existe no banco.",
    status: 409, // (Conflict: Quando há um conflito, como uma violação de chave única)
  },
  P2003: {
    message:
      "Falha na chave estrangeira: Violação de chave estrangeira ao tentar salvar o dado.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2004: {
    message:
      "Erro no banco de dados: Ocorreu um erro ao tentar acessar ou manipular o banco.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2005: {
    message:
      "Valor inválido para o campo: O valor fornecido não é compatível com o tipo de dado esperado.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2006: {
    message: "Valor fornecido não é válido: O dado enviado não é válido.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2007: {
    message:
      "Erro de validação de dados: Não foi possível validar os dados fornecidos.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2008: {
    message:
      "Falha ao processar a consulta: A consulta não pôde ser executada.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2009: {
    message: "Erro na validação da consulta: A consulta não foi válida.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2010: {
    message: "Falha ao executar a consulta: A consulta não pode ser executada.",
    status: 500, // (Internal Server Error: Erros gerais do servidor ou problemas inesperados)
  },
  P2011: {
    message:
      "Violação de restrição de campo nulo: Um campo obrigatório não foi preenchido.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2012: {
    message:
      "Faltando valor obrigatório: Um valor obrigatório não foi fornecido.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2013: {
    message:
      "Faltando argumento obrigatório: Um argumento necessário não foi enviado na requisição.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2014: {
    message:
      "Alteração violaria relação obrigatória: Você não pode alterar dados que têm dependências obrigatórias.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2015: {
    message:
      "Registro relacionado não encontrado: Não foi possível encontrar um registro relacionado.",
    status: 404, // (Not Found: Quando um recurso não é encontrado no banco de dados)
  },
  P2016: {
    message:
      "Erro ao interpretar a consulta: Não conseguimos interpretar sua consulta.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2017: {
    message:
      "Relação entre os dados não foi conectada: A relação entre os dados não pôde ser estabelecida.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2018: {
    message:
      "Registros necessários não encontrados: Não encontramos todos os registros necessários para a operação.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2019: {
    message: "Erro de entrada: Dados de entrada inválidos.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2020: {
    message:
      "Valor fora do intervalo: O valor fornecido está fora do intervalo permitido.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2021: {
    message:
      "Tabela não existe: A tabela que você está tentando acessar não foi encontrada.",
    status: 404, // (Not Found: Quando um recurso não é encontrado no banco de dados)
  },
  P2022: {
    message:
      "Coluna não existe: A coluna que você está tentando acessar não foi encontrada.",
    status: 404, // (Not Found: Quando um recurso não é encontrado no banco de dados)
  },
  P2023: {
    message:
      "Dados inconsistentes: O banco de dados contém dados inconsistentes.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2024: {
    message:
      "Tempo limite de conexão excedido: O tempo limite para conexão foi atingido.",
    status: 408, // (Request Timeout: Quando a requisição demora demais para ser completada)
  },
  P2025: {
    message:
      "Registros obrigatórios não encontrados: Faltando registros essenciais para concluir a operação.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2026: {
    message:
      "Recurso não suportado pelo banco de dados: O banco de dados não suporta essa operação.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2027: {
    message:
      "Múltiplos erros ao executar a consulta: Erros múltiplos foram detectados na consulta.",
    status: 500, // (Internal Server Error: Erros gerais do servidor ou problemas inesperados)
  },
  P2028: {
    message: "Erro na transação: A transação falhou.",
    status: 500, // (Internal Server Error: Erros gerais do servidor ou problemas inesperados)
  },
  P2029: {
    message:
      "Limite de parâmetros da consulta excedido: A consulta excedeu o limite de parâmetros.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2030: {
    message:
      "Índice de texto completo não encontrado: O índice de texto completo não foi encontrado no banco de dados.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2031: {
    message: "MongoDB precisa ser configurado como conjunto de réplicas.",
    status: 500, // (Internal Server Error: Erros gerais do servidor ou problemas inesperados)
  },
  P2033: {
    message: "Número não cabe em um inteiro de 64 bits.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2034: {
    message:
      "Conflito de transação ou deadlock: Ocorrência de deadlock ou conflito de transação.",
    status: 409, // (Conflict: Quando há um conflito, como uma violação de chave única)
  },
  P2035: {
    message: "Erro no banco de dados: Erro desconhecido no banco de dados.",
    status: 400, // (Bad Request: Quando os dados da requisição são inválidos)
  },
  P2036: {
    message: "Erro no conector externo: O conector externo falhou.",
    status: 500, // (Internal Server Error: Erros gerais do servidor ou problemas inesperados)
  },
  P2037: {
    message: "Limite de conexões de banco de dados atingido.",
    status: 503, // (Service Unavailable: O servidor está temporariamente indisponível)
  },
};

const handleErrorSelection = (errorCode: string) => {
  const mappetError = prismaErrorMessages[errorCode];
  if (mappetError) return mappetError;

  return {
    message: "O banco de dados está instável",
    status: 500, // (Service Unavailable: O servidor está temporariamente indisponível)
  };
};

export default handleErrorSelection;
