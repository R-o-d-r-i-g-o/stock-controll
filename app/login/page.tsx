import { Suspense } from "react";

import { Loader, InfoButton } from "@/components/ui";
import LoginForm from "./_form";

const LoginPage = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
    <div className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-md mx-5 sm:mx-0">
      <Suspense fallback={<Loader />}>
        <LoginForm />
      </Suspense>
      <InfoButton />
    </div>
  </div>
);

export default LoginPage;
