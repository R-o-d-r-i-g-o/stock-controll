"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Container from "@/components/templates/container";
import Title from "@/components/ui/title";

const PaymentSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!sessionId) {
      router.push("/panel/account");
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/panel/account");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionId, router]);

  return (
    <Container>
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
            <CheckCircleIcon className="text-green-600 text-6xl" />
          </div>
          <Title className="text-3xl mb-4 font-bold text-gray-800" text="Pagamento Realizado com Sucesso!" />
          <p className="text-gray-600 text-lg mb-2">
            Sua mensalidade foi processada com sucesso.
          </p>
          <p className="text-gray-500 text-sm">
            Você será redirecionado para a página da conta em {countdown} segundos...
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4 mb-6 border-2 border-green-200">
          <p className="text-sm text-green-800">
            <strong>ID da Sessão:</strong> {sessionId}
          </p>
          <p className="text-sm text-green-700 mt-2">
            Um e-mail de confirmação foi enviado para você.
          </p>
        </div>

        <button
          onClick={() => router.push("/panel/account")}
          className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 shadow-md hover:shadow-lg"
        >
          Voltar para Minha Conta
        </button>
      </div>
    </Container>
  );
};

export default PaymentSuccessPage;

