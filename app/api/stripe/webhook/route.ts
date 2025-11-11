import { NextRequest, NextResponse } from "next/server";
import { stripe, STRIPE_WEBHOOK_SECRET } from "@/lib/features/stripe/stripe.client";
import Stripe from "stripe";
import subscriptionSvc from "@/lib/features/subscription/subscription.svc";
import companySvc from "@/lib/features/company/company.svc";
import auditSvc from "@/lib/features/audit/audit.svc";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature || !STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Missing stripe signature or webhook secret" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  try {
    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === "subscription" && session.metadata) {
          const companyId = parseInt(session.metadata.companyId || "0");
          const userId = parseInt(session.metadata.userId || "0");
          
          if (companyId && userId) {
            // Get subscription details
            const subscriptionId = session.subscription as string;
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            
            // Create subscription record
            const price = subscription.items.data[0]?.price.unit_amount || 9990;
            const subscriptionRecordId = await subscriptionSvc.createSubscription({
              companyId,
              price: price / 100, // Convert cents to reais
              stripeSessionId: session.id,
              stripePaymentId: subscriptionId,
              status: "completed",
            });

            // Update company subscription expiration (add 30 days)
            const company = await companySvc.getCompanyBy({ id: companyId });
            if (company) {
              const expirationDate = new Date();
              expirationDate.setDate(expirationDate.getDate() + 30);
              await companySvc.updateCompany({
                id: company.id,
                subscriptionExpiresAt: expirationDate,
              });
            }

            // Create audit record
            await auditSvc.createAuditRecord({
              userId,
              companyId,
              note: `Pagamento de mensalidade processado via Stripe (Subscription #${subscriptionRecordId})`,
            });
          }
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice & { subscription?: string | Stripe.Subscription | null };
        // Invoice subscription can be a string ID or expanded Subscription object
        const subscriptionId = invoice.subscription 
          ? (typeof invoice.subscription === "string" ? invoice.subscription : invoice.subscription.id)
          : null;
        
        if (subscriptionId && invoice.metadata?.companyId) {
          const companyId = parseInt(invoice.metadata.companyId);
          
          // Update company subscription expiration (add 30 days from now)
          const company = await companySvc.getCompanyBy({ id: companyId });
          if (company) {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 30);
            await companySvc.updateCompany({
              id: company.id,
              subscriptionExpiresAt: expirationDate,
            });
          }

          // Create new subscription record for recurring payment
          const price = invoice.amount_paid || 9990;
          await subscriptionSvc.createSubscription({
            companyId,
            price: price / 100,
            stripeSessionId: invoice.id,
            stripePaymentId: subscriptionId,
            status: "completed",
          });
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.metadata?.companyId) {
          const companyId = parseInt(invoice.metadata.companyId);
          // You could update subscription status to failed here
          console.error(`Payment failed for company ${companyId}`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Error processing webhook" },
      { status: 500 }
    );
  }
}

