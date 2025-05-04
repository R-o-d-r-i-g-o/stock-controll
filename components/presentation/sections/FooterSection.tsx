import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const helperLinks = [
    { link: "/docs/use-terms", label: "Termos de uso" },
    { link: "/docs/privacy-policies", label: "Políticas de privacidade" },
    { link: "/docs/external-api", label: "Documentação API" },
  ];

  return (
    <footer className="w-full px-6 md:px-16 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex-shrink-0 hover:scale-105 transition-transform duration-300">
          <Image src="/icons/logo_shoe.png" alt="Marca-Passo ERP - Gestão para Sapatarias" width={90} height={90} className="object-contain" priority />
        </div>
        <div className="text-center md:text-left text-sm text-white">© {currentYear} ERP | Marca-Passo. Potencializando a gestão de sapatarias e fábricas de calçados.</div>
        <nav className="flex gap-6 text-sm font-medium">
          {helperLinks.map((h) => (
            <Link key={h.link} href={h.link} className="hover:text-white transition-colors duration-300">
              {h.label}
            </Link>
          ))}
        </nav>
      </div>
      <Separator className="my-6 border-white" />
      <div className="text-center text-sm text-white leading-relaxed max-w-2xl mx-auto">A Marca-Passo é a aliada ideal para gestores de sapatarias e fábricas de calçados. Facilitamos sua rotina com ferramentas eficientes de estoque, vendas e produção.</div>
    </footer>
  );
};

export default FooterSection;
