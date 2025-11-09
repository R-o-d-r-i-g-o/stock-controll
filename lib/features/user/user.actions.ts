"use server";

import userSvc from "./user.svc";
import auditSvc from "../audit/audit.svc";
import { actionHandler } from "../../common/action-handler";
import { validateAuthUserServerAction } from "../../common/api.server-action-auth";
import { getUsersPaginatedSchema, createUserSchema, updateUserSchema } from "./user.schema";

/**
 * Server Action to get users with pagination
 */
export async function getUsersPaginatedAction(params: { page: number; size: number }) {
  return actionHandler(async () => {
    await validateAuthUserServerAction();

    const payload = getUsersPaginatedSchema.parse({
      page: params.page.toString(),
      size: params.size.toString(),
    });

    return await userSvc.getUsersPaginated(payload);
  });
}

/**
 * Server Action to get a specific user by ID
 */
export async function getUserByIdAction(userId: number) {
  return actionHandler(async () => {
    await validateAuthUserServerAction();
    return await userSvc.getUserBy({ id: userId });
  });
}

/**
 * Server Action to get role list
 */
export async function getRoleListAction() {
  return actionHandler(async () => {
    await validateAuthUserServerAction();
    return await userSvc.getRoleList();
  });
}

/**
 * Server Action to create a new user
 */
export async function createUserAction(data: unknown) {
  return actionHandler(async () => {
    const user = await validateAuthUserServerAction();
    const payload = createUserSchema.parse(data);

    const userId = await userSvc.createUser({ ...payload, companyId: user.companyId });
    await auditSvc.createAuditRecord({
      userId: user.id,
      companyId: user.companyId,
      note: `O usuário criou um registro de novo usuário (#${userId}).`,
    });

    return { userId };
  });
}

/**
 * Server Action to update a user
 */
export async function updateUserAction(data: unknown) {
  return actionHandler(async () => {
    const user = await validateAuthUserServerAction();
    const payload = updateUserSchema.parse(data);

    await userSvc.updateUser(payload);
    await auditSvc.createAuditRecord({
      userId: user.id,
      companyId: user.companyId,
      note: `O usuário atualizou os dados do usuário #${payload.id}`,
    });

    return null;
  });
}

/**
 * Server Action to delete a user
 */
export async function deleteUserAction(userId: number) {
  return actionHandler(async () => {
    const user = await validateAuthUserServerAction();

    await userSvc.deleteUser(userId);
    await auditSvc.createAuditRecord({
      userId: user.id,
      companyId: user.companyId,
      note: `O usuário deletou o registro de usuário #${userId}`,
    });

    return null;
  });
}

