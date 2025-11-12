"use server";

import { actionHandler } from "../../common/action-handler";
import { registerSchema } from "./auth.schema";
import companySvc from "../company/company.svc";
import userSvc from "../user/user.svc";
import auditSvc from "../audit/audit.svc";
import * as h from "../user/user.helper";
import moment from "moment";

const { encryptPassword } = h.hashHelper();

/**
 * Server Action to register a new user and company
 */
export async function registerAction(data: unknown) {
  return actionHandler(async () => {
    const payload = registerSchema.parse(data);

    // Set free tier expiration to 30 days from now
    const freeTierExpiresAt = moment().add(30, "days").toDate();

    // Create company first with free tier expiration
    const companyId = await companySvc.createCompany({
      name: payload.companyName,
      freeTierExpiresAt,
    });

    // Create user with admin role (roleId: 2)
    // Use username as name for the user
    const userId = await userSvc.createUser({
      name: payload.username,
      email: payload.email,
      roleId: 2, // admin
      password: await encryptPassword(payload.password),
      companyId,
    });

    // Create audit record
    await auditSvc.createAuditRecord({
      userId,
      companyId,
      note: `O usuário se registrou e criou a compania atual.`,
    });

    return { userId, companyId };
  });
}

