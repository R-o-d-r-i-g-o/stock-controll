import Link from "next/link";

import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import Background from "@/components/templates/background";

const NotFoundPage = () => (
  <Background type="error">
    <Container className="text-center" display="small">
      <Title className="mb-4 !text-5xl" text="404" />
      <Title className="mb-6 !text-xl" text="Não Encontrado(a)" />
      <p className="text-gray-500 mb-8">
        Desculpe, a página e/ou recurso que você está procurando não existe ou
        foi movido(a).
      </p>
      <Link
        href="/"
        className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
      >
        Voltar para a Página Inicial
      </Link>
    </Container>
  </Background>
);

export default NotFoundPage;
