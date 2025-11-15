"use server";

import subscriptionSvc from "./subscription.svc";
import companySvc from "../company/company.svc";
import auditSvc from "../audit/audit.svc";
import { actionHandler } from "../../common/action-handler";
import { validateAuthUserServerAction } from "../../common/api.server-action-auth";
import { createSubscriptionSchema } from "./subscription.schema";

/**
 * Server Action to get subscriptions by company
 */
export async function getSubscriptionsByCompanyAction() {
  return actionHandler(async () => {
    const user = await validateAuthUserServerAction();
    return await subscriptionSvc.getSubscriptionsByCompany({ companyId: user.companyId });
  });
}

/**
 * Server Action to create a new subscription payment
 */
export async function createSubscriptionAction(data: unknown) {
  return actionHandler(async () => {
    const user = await validateAuthUserServerAction();
    const payload = createSubscriptionSchema.parse(data);

    const subscriptionId = await subscriptionSvc.createSubscription({
      companyId: user.companyId,
      price: payload.price,
    });

    // Update company subscription expiration (add 30 days)
    const company = await companySvc.getCompanyBy({ id: user.companyId });
    if (company) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);
      await companySvc.updateCompany({
        id: company.id,
        subscriptionExpiresAt: expirationDate,
      });
    }

    await auditSvc.createAuditRecord({
      userId: user.id,
      companyId: user.companyId,
      note: `O usuário criou um pagamento de mensalidade (#${subscriptionId})`,
    });

    return { subscriptionId };
  });
}

