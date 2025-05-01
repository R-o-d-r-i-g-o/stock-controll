import { redirect } from "next/navigation";
import { auth } from "@/app/api/_backend/features/auth/auth.handler"; //TODO: improve it later.

import NavBar from "@/components/presentation/common/NavBar";
import ServiceSection from "@/components/presentation/sections/ServiceSection";
import TeamSection from "@/components/presentation/sections/TeamSection";
import VideoPlayerSection from "@/components/presentation/sections/VideoPlayerSection";
import NewsletterSection from "@/components/presentation/sections/NewsletterSection";
import HeroSection from "@/components/presentation/sections/HeroSection";
import TestimonialSection from "@/components/presentation/sections/TestimonialSection";
import FooterSection from "@/components/presentation/sections/FooterSection";
import Background from "@/components/templates/background";

const Page = async () => {
  const session = await auth.auth();
  if (session) redirect("/panel");

  return (
    <Background>
      <main>
        <NavBar />
        <div className="mt-24 md:32 lg:mt-8 px-4 md:px-[9rem]">
          <HeroSection />
          <ServiceSection />
          <VideoPlayerSection />
          <TestimonialSection />
          <TeamSection />
          <NewsletterSection />
          <FooterSection />
        </div>
      </main>
    </Background>
  );
};

export default Page;
