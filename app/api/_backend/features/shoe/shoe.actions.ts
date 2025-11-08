"use server";

import shoeSvc from "./shoe.svc";
import { errorHandler } from "../../common/api.error";
import { validateAuthUserServerAction } from "../../common/api.server-action-auth";

/**
 * Server Action to get shoes grouped by item size with pagination
 */
export async function getShoesGroupedByItemSizePaginatedAction(params: { page: number; size: number }) {
  try {
    await validateAuthUserServerAction();

    const payload = {
      page: params.page,
      size: params.size,
    };

    const groupedItems = await shoeSvc.getShoesGroupedBySizePaginated(payload);
    return { success: true, data: groupedItems };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action to get a specific shoe by ID
 */
export async function getShoeByIdAction(id: number) {
  try {
    await validateAuthUserServerAction();

    const shoe = await shoeSvc.getShoeBy({ id });
    return { success: true, data: shoe };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

