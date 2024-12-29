import Link from "next/link";
import { NavigationPage } from "@/common";

const ReportPage = () => (
  <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Em Manutenção...</h2>
    <p className="text-xl font-medium text-gray-600 mb-6">
      Estamos trabalhando na melhoria dessa funcionalidade.
    </p>
    <p className="text-gray-500 mb-8">
      Desculpe o transtorno. Por favor, tente novamente mais tarde.
    </p>
    <Link
      href={NavigationPage.Home}
      className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
    >
      Voltar para a Página Inicial
    </Link>
  </div>
);

export default ReportPage;
