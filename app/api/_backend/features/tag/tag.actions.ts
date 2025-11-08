"use server";

import * as svc from "./tag.svc";
import { errorHandler } from "../../common/api.error";
import { validateAuthUserServerAction } from "../../common/api.server-action-auth";

/**
 * Server Action to get tags related to a shoe
 */
export async function getShoeRelatedTagsAction(shoeId: number) {
  try {
    await validateAuthUserServerAction();

    const tags = await svc.getShoeRelatedTags(shoeId);
    return { success: true, data: tags };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action to get a specific tag
 */
export async function getTagByIdAction(params: { id: number; shoeId: number }) {
  try {
    await validateAuthUserServerAction();

    const tag = await svc.getTagBy({
      id: params.id,
      shoeId: params.shoeId,
    });
    return { success: true, data: tag };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

