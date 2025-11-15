"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import LoadingButton from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import Container from "@/components/templates/container";
import Title from "@/components/ui/title";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const PaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canceled = searchParams.get("canceled");

  useEffect(() => {
    if (canceled === "true") {
      setError("Pagamento cancelado. Você pode tentar novamente quando quiser.");
    }
  }, [canceled]);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar sessão de pagamento");
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe não foi inicializado corretamente");
      }

      // Redirect to Stripe Checkout
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err instanceof Error ? err.message : "Erro ao processar pagamento");
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="bg-indigo-100 rounded-full p-4 inline-block mb-4">
            <PaymentIcon className="text-indigo-600 text-5xl" />
          </div>
          <Title className="text-3xl mb-4 font-bold text-gray-800" text="Pagamento de Mensalidade" />
          <p className="text-gray-600 text-lg">
            Renove sua assinatura mensal e continue aproveitando todos os recursos do ERP Marca-Passo
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-center">
            <ErrorIcon className="text-red-600 mr-3" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 mb-6 border-2 border-indigo-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Plano Mensal</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Valor da mensalidade:</span>
              <span className="text-3xl font-bold text-indigo-600">R$ 99,90</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Período:</span>
              <span className="text-lg font-semibold text-gray-800">30 dias</span>
            </div>
            <div className="pt-4 border-t border-indigo-200">
              <p className="text-sm text-gray-600 mb-2">Inclui:</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <CheckCircleIcon className="text-green-500 mr-2 text-sm" />
                  Acesso completo ao sistema
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="text-green-500 mr-2 text-sm" />
                  Suporte técnico
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="text-green-500 mr-2 text-sm" />
                  Atualizações automáticas
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="text-green-500 mr-2 text-sm" />
                  Backup automático dos dados
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <LoadingButton
            onClick={handlePayment}
            disabled={loading}
            variant="contained"
            fullWidth
            size="large"
            className="!bg-gradient-to-r !from-indigo-600 !to-purple-600 !text-white !font-semibold !py-4 !text-lg hover:!from-indigo-700 hover:!to-purple-700 !shadow-lg hover:!shadow-xl !transition-all !duration-300"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PaymentIcon />}
          >
            {loading ? "Processando..." : "Pagar com Stripe"}
          </LoadingButton>

          <button
            onClick={() => router.push("/panel/account")}
            className="w-full py-3 px-4 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 border-2 border-gray-300"
          >
            Voltar para Conta
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 text-center">
            <strong>Seguro e confiável:</strong> Seus pagamentos são processados de forma segura pelo Stripe.
            Não armazenamos informações de cartão de crédito.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default PaymentPage;

