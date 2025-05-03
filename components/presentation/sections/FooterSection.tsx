import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-40 px-6 md:px-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-8">
        <div className="flex-shrink-0 hover:animate-wiggle hover:animate-twice hover:animate-ease-out">
          <Image src="/icons/logo_shoe.png" alt="Logo do site Marca-Passo" width={120} height={120} className="object-contain" priority />
        </div>
        <div className="text-lightBlue text-sm text-center md:text-left">© {currentYear} Marca-Passo. Todos os direitos reservados.</div>
        <nav className="flex gap-6 text-lightBlue text-sm font-medium">
          <Link href="/docs/use-terms" className="hover:underline">
            Termos de uso
          </Link>
          <Link href="/docs/privacy-policies" className="hover:underline">
            Políticas de privacidade
          </Link>
        </nav>
      </div>
      <Separator />
      <div className="py-10">
        <p className="text-white text-sm text-center leading-relaxed max-w-2xl mx-auto">Para mantermos nossas ferramentas gratuitas, exibimos alguns anúncios em nosso site. Esperamos que isso não afete sua experiência.</p>
      </div>
    </footer>
  );
};

export default FooterSection;
