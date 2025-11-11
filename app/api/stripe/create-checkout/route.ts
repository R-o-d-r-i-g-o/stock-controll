import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/stripe.client";
import { auth } from "@/lib/features/auth/auth.handler";
import userSvc from "@/lib/features/user/user.svc";
import companySvc from "@/lib/features/company/company.svc";

// Monthly subscription price in cents (R$ 99.90 = 9990 cents)
const MONTHLY_PRICE_CENTS = 9990;

export async function POST(req: NextRequest) {
  try {
    // Validate authentication
    const session = await auth.auth();
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const user = await userSvc.getUserBy({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const company = await companySvc.getCompanyBy({ id: user.companyId });
    if (!company) {
      return NextResponse.json(
        { error: "Empresa não encontrada" },
        { status: 404 }
      );
    }

    // Create Stripe Checkout Session
    const sessionStripe = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Mensalidade - ERP Marca-Passo",
              description: `Mensalidade mensal para ${company.name}`,
            },
            unit_amount: MONTHLY_PRICE_CENTS,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.nextUrl.origin}/panel/account/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/panel/account/payment?canceled=true`,
      customer_email: user.email,
      metadata: {
        companyId: company.id.toString(),
        userId: user.id.toString(),
        companyName: company.name,
      },
    });

    return NextResponse.json({ sessionId: sessionStripe.id, url: sessionStripe.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Erro ao criar sessão de pagamento" },
      { status: 500 }
    );
  }
}

