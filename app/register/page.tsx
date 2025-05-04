import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ArrowBack } from "@mui/icons-material";

import Ping from "@/components/ui/ping";
import Title from "@/components/ui/title";
import Container from "@/components/templates/container";
import Background from "@/components/templates/background";
import RegisterForm from "@/components/shared/form/register";

const RegisterPage: React.FC = () => (
  <Background className="py-32">
    <Container display="small">
      <Link href="/" className="text-gray-600 hover:text-gray-800">
        <ArrowBack fontSize="small" />
      </Link>
      <div className="h-[30px] flex justify-center items-center">
        <div className="transform -translate-y-20 rounded-full overflow-hidden">
          <Image alt="Logo" src="/icons/logo_shoe.png" width={200} height={200} />
        </div>
      </div>
      <Title className="text-center mb-6" text="Registro" />
      <RegisterForm />
    </Container>
    <Ping />
  </Background>
);

export default RegisterPage;
