import { auth } from "@/app/api/_backend/features/auth/auth.handler";
import { redirect } from "next/navigation";

import NavBar from "@/components/presentation/common/NavBar";
import Background from "@/components/templates/background";
import HeroSection from "@/components/presentation/sections/HeroSection";
import TeamSection from "@/components/presentation/sections/TeamSection";
import SpecialOffer from "@/components/presentation/sections/SpecialOffer";
import FooterSection from "@/components/presentation/sections/FooterSection";
import ContactSection from "@/components/presentation/sections/ContactSection";
import ServiceSection from "@/components/presentation/sections/ServiceSection";
import ObjetionSection from "@/components/presentation/sections/ObjetionSection";
import TestimonialSection from "@/components/presentation/sections/TestimonialSection";

const Page = async () => {
  const session = await auth.auth();
  if (session) redirect("/panel");

  return (
    <Background>
      <main>
        <NavBar />
        <div className="px-4 md:px-[9rem]">
          <HeroSection />
          <SpecialOffer />
          <ObjetionSection />
          <TeamSection />
          <ServiceSection />
          <TestimonialSection />
          <ContactSection />
          <FooterSection />
        </div>
      </main>
    </Background>
  );
};

export default Page;
