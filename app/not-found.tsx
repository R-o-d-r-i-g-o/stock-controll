import Link from "next/link";
import { NavigationPage } from "@/common";

const NotFoundPage = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500">
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md text-center">
      <h2 className="text-5xl font-bold text-gray-800 mb-4">404</h2>
      <p className="text-xl font-medium text-gray-600 mb-6">
        Não Encontrado(a)
      </p>
      <p className="text-gray-500 mb-8">
        Desculpe, a página e/ou recurso que você está procurando não existe ou
        foi movido(a).
      </p>
      <Link
        href={NavigationPage.Home}
        className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
      >
        Voltar para a Página Inicial
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
