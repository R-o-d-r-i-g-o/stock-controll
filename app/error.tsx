"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => console.error(error), [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">Ops...</h2>
        <p className="text-xl font-medium text-gray-600 mb-6">
          Desculpe, algo deu errado.
        </p>
        <p className="text-gray-500 mb-8">
          Não conseguimos processar sua solicitação no momento. Tente novamente
          mais tarde ou entre em contato com o suporte.
        </p>
        <button
          onClick={reset}
          className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          Tente novamente
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
