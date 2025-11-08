"use server";

import * as svc from "./tag.svc";
import { errorHandler } from "../../common/api.error";
import { validateAuthUserServerAction } from "../../common/api.server-action-auth";
import { createTagSchema, updateTagSchema, deleteTagSchema } from "./tag.schema";

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

/**
 * Server Action to create a tag
 */
export async function createTagAction(data: unknown, shoeId: number) {
  try {
    const user = await validateAuthUserServerAction();

    const result = createTagSchema.safeParse(data);
    if (!result.success) {
      return { success: false, error: result.error.errors[0].message };
    }

    const tagId = await svc.createTag({
      ...result.data,
      userId: user.id,
      companyId: user.companyId,
      shoeId,
    });

    return { success: true, data: { tagId } };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action to update a tag
 */
export async function updateTagAction(data: unknown, tagId: number, shoeId: number) {
  try {
    const user = await validateAuthUserServerAction();

    const result = updateTagSchema.safeParse(data);
    if (!result.success) {
      return { success: false, error: result.error.errors[0].message };
    }

    await svc.updateTag({
      ...result.data,
      id: tagId,
      shoeId: shoeId,
      userId: user.id,
    });

    return { success: true, data: null };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

/**
 * Server Action to delete a tag
 */
export async function deleteTagAction(tagId: number, shoeId: number) {
  try {
    await validateAuthUserServerAction();

    const result = deleteTagSchema.safeParse({
      shoeId: shoeId.toString(),
      tagId: tagId.toString(),
    });
    if (!result.success) {
      return { success: false, error: result.error.errors[0].message };
    }

    await svc.deleteTag(result.data);

    return { success: true, data: null };
  } catch (err) {
    const error = errorHandler(err);
    return { success: false, error: error.message };
  }
}

