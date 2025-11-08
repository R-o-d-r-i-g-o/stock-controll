"use server";

import userSvc from "./user.svc";
import auditSvc from "../audit/audit.svc";
import { errorHandler, launchError } from "../../common/api.error";
import { validateAuthUserServerAction } from "../../common/api.server-action-auth";
import { getUsersPaginatedSchema, createUserSchema, updateUserSchema } from "./user.schema";

/**
 * Server Action to get users with pagination
 */
export async function getUsersPaginatedAction(params: { page: number; size: number }) {
  try {
    await validateAuthUserServerAction();

    const result = getUsersPaginatedSchema.safeParse({
      page: params.page.toString(),
      size: params.size.toString(),
    });
    
    if (result.error) {
      throw launchError(result.error.errors[0].message, 400);
    }

    const users = await userSvc.getUsersPaginated(result.data);
    return { success: true, data: users };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action to get a specific user by ID
 */
export async function getUserByIdAction(userId: number) {
  try {
    await validateAuthUserServerAction();

    const user = await userSvc.getUserBy({ id: userId });
    return { success: true, data: user };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action to get role list
 */
export async function getRoleListAction() {
  try {
    await validateAuthUserServerAction();

    const roles = await userSvc.getRoleList();
    return { success: true, data: roles };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action to create a new user
 */
export async function createUserAction(data: unknown) {
  try {
    const user = await validateAuthUserServerAction();

    const result = createUserSchema.safeParse(data);
    if (!result.success) {
      return { success: false, error: result.error.errors[0].message };
    }

    const userId = await userSvc.createUser({ ...result.data, companyId: user.companyId });
    await auditSvc.createAuditRecord({
      userId: user.id,
      companyId: user.companyId,
      note: `O usuário criou um registro de novo usuário (#${userId}).`,
    });

    return { success: true, data: { userId } };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action to update a user
 */
export async function updateUserAction(data: unknown) {
  try {
    const user = await validateAuthUserServerAction();

    const result = updateUserSchema.safeParse(data);
    if (!result.success) {
      return { success: false, error: result.error.errors[0].message };
    }

    await userSvc.updateUser(result.data);
    await auditSvc.createAuditRecord({
      userId: user.id,
      companyId: user.companyId,
      note: `O usuário atualizou os dadas do usuário #${result.data.id}`,
    });

    return { success: true, data: null };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action to delete a user
 */
export async function deleteUserAction(userId: number) {
  try {
    const user = await validateAuthUserServerAction();

    await userSvc.deleteUser(userId);
    await auditSvc.createAuditRecord({
      userId: user.id,
      companyId: user.companyId,
      note: `O usuário deletou o registro de usuário #${userId}`,
    });

    return { success: true, data: null };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

