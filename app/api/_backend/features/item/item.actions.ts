"use server";

import itemSvc from "./item.svc";
import { errorHandler } from "../../common/api.error";
import { validateAuthUserServerAction } from "../../common/api.server-action-auth";

/**
 * Server Action to get an item by ID
 */
export async function getItemByIdAction(itemId: number) {
  try {
    await validateAuthUserServerAction();

    const item = await itemSvc.getItemBy({ id: itemId });
    return { success: true, data: item };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

