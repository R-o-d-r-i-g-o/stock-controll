import { auth } from "@/app/api/_backend/features/auth/auth.handler";
import { redirect } from "next/navigation";

import NavBar from "@/components/presentation/common/NavBar";
import Background from "@/components/templates/background";
import HeroSection from "@/components/presentation/sections/HeroSection";
import TeamSection from "@/components/presentation/sections/TeamSection";
import SpecialOffer from "@/components/presentation/sections/SpecialOffer";
import FooterSection from "@/components/presentation/sections/FooterSection";
import ServiceSection from "@/components/presentation/sections/ServiceSection";
import TestimonialSection from "@/components/presentation/sections/TestimonialSection";

const Page = async () => {
  const session = await auth.auth();
  if (session) redirect("/panel");

  return (
    <Background>
      <main>
        <NavBar />
        <div className="mt-24 md:32 lg:mt-8 px-4 md:px-[9rem]">
          <HeroSection />
          <SpecialOffer />
          <TeamSection />
          <ServiceSection />
          <TestimonialSection />
          <FooterSection />
        </div>
      </main>
    </Background>
  );
};

export default Page;
