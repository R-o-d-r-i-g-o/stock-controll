"use server";

import userSvc from "./user.svc";
import { errorHandler, launchError } from "../../common/api.error";
import { validateAuthUserServerAction } from "../../common/api.server-action-auth";
import { getUsersPaginatedSchema } from "./user.schema";

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

