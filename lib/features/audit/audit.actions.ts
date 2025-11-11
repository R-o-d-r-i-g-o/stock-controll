"use server";

import auditSvc from "./audit.svc";
import { actionHandler } from "../../common/action-handler";
import { validateAuthUserServerAction } from "../../common/api.server-action-auth";
import { getUsersPaginatedSchema } from "./audit.schema";

/**
 * Server Action to get audits with pagination
 */
export async function getAuditsPaginatedAction(params: { page: number; size: number }) {
  return actionHandler(async () => {
    await validateAuthUserServerAction();

    const payload = getUsersPaginatedSchema.parse({
      page: params.page.toString(),
      size: params.size.toString(),
    });

    return await auditSvc.getAuditsPaginated(payload);
  });
}

/**
 * Server Action to get audits by date (optimized for charts)
 */
export async function getAuditsByDateAction(startDate: string, endDate: string) {
  return actionHandler(async () => {
    const user = await validateAuthUserServerAction();
    return await auditSvc.getAuditsByDate({
      companyId: user.companyId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
  });
}

