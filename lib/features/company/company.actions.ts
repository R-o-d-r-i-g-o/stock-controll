"use server";

import companySvc from "./company.svc";
import auditSvc from "../audit/audit.svc";
import { actionHandler } from "../../common/action-handler";
import { validateAuthUserServerAction } from "../../common/api.server-action-auth";
import { updateCompanySchema } from "./company.schema";

/**
 * Server Action to get company by user ID
 */
export async function getCompanyByUserIdAction() {
  return actionHandler(async () => {
    const user = await validateAuthUserServerAction();
    return await companySvc.getCompanyBy({ userId: user.id });
  });
}

/**
 * Server Action to update company
 */
export async function updateCompanyAction(data: unknown) {
  return actionHandler(async () => {
    const user = await validateAuthUserServerAction();
    const payload = updateCompanySchema.parse(data);

    // Ensure user can only update their own company
    const company = await companySvc.getCompanyBy({ id: payload.id });
    if (!company || company.id !== user.companyId) {
      throw new Error("Não autorizado a atualizar esta empresa");
    }

    await companySvc.updateCompany(payload);
    await auditSvc.createAuditRecord({
      userId: user.id,
      companyId: user.companyId,
      note: `O usuário atualizou os dados da empresa #${payload.id}`,
    });

    return null;
  });
}

