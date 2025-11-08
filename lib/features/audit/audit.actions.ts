"use server";

import auditSvc from "./audit.svc";
import { errorHandler, launchError } from "../../common/api.error";
import { validateAuthUserServerAction } from "../../common/api.server-action-auth";
import { getUsersPaginatedSchema } from "./audit.schema";

/**
 * Server Action to get audits with pagination
 */
export async function getAuditsPaginatedAction(params: { page: number; size: number }) {
  try {
    await validateAuthUserServerAction();

    const result = getUsersPaginatedSchema.safeParse({
      page: params.page.toString(),
      size: params.size.toString(),
    });
    
    if (result.error) {
      throw launchError(result.error.errors[0].message, 400);
    }

    const audits = await auditSvc.getAuditsPaginated(result.data);
    return { success: true, data: audits };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

