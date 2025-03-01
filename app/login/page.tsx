import React from "react";
import Image from "next/image";

import Ping from "@/components/ui/ping";
import LoginForm from "@/components/shared/login-form";
import Container from "@/components/templates/container";
import Background from "@/components/templates/background";

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

const LoginPage: React.FC<LoginPageProps> = async ({ searchParams }) => {
  const { callbackUrl } = await searchParams;

  return (
    <Background>
      <Container display="small">
        <div className="h-[30px] flex justify-center items-center">
          <div className="transform -translate-y-20 rounded-full overflow-hidden">
            <Image
              alt="Logo"
              src="/icons/logo_shoe.png"
              width={200}
              height={200}
            />
          </div>
        </div>
        <p className="text-2xl sm:text-3xl text-center font-bold mb-6 text-gray-800">
          Entrar
        </p>
        <LoginForm callbackUrl={callbackUrl} />
      </Container>
      <Ping />
    </Background>
  );
};

export default LoginPage;
