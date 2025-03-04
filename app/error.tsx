"use client";

import Link from "next/link";

import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import Background from "@/components/templates/background";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <Background type="error">
      <Container className="text-center" display="small">
        <Title className="mb-4 !text-5xl" text="Ops..." />
        <Title className="mb-6 !text-xl" text=" Desculpe, algo deu errado" />
        <p className="text-gray-500 mb-8">
          Não conseguimos processar sua solicitação no momento. Tente novamente
          mais tarde ou entre em contato com o suporte.
        </p>
        {error && (
          <div className="bg-white p-2 rounded-lg shadow-md mb-6">
            <Title className="!text-lg" text="Detalhes do erro:" />
            <pre className="overflow-x-scroll text-sm text-red-600 mt-2">
              {error.message}
            </pre>
            {error.stack && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800">Stack Trace:</h4>
                <pre className="overflow-x-scroll text-xs text-gray-500">
                  {error.stack}
                </pre>
              </div>
            )}
          </div>
        )}
        <button
          onClick={reset}
          className="w-full py-3 mb-6 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          Tente novamente
        </button>
        <Link
          href="/"
          className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          Voltar para a Página Inicial
        </Link>
      </Container>
    </Background>
  );
};

export default ErrorPage;
