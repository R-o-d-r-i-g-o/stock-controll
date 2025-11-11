import { auth } from "@/lib/features/auth/auth.handler";
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
      <main className="overflow-x-hidden">
        <span id="home" />
        <NavBar />
        <div className="px-4 md:px-8 lg:px-16 xl:px-24">
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
