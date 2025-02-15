import { Suspense } from "react";
import Image from "next/image";

import { Loader, InfoButton } from "@/components/ui";
import LoginForm from "./_form";

const LoginPage = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
    <div className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-md mx-5 sm:mx-0">
      <div className="h-[40px] flex justify-center items-center">
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
      <Suspense fallback={<Loader />}>
        <LoginForm />
      </Suspense>
      <InfoButton />
    </div>
  </div>
);

export default LoginPage;
