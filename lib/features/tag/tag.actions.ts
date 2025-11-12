"use server";

import * as svc from "./tag.svc";
import { actionHandler } from "../../common/action-handler";
import { validateAuthUserServerAction } from "../../common/api.server-action-auth";
import { createTagSchema, updateTagSchema, deleteTagSchema } from "./tag.schema";
import { validateFreeTierForCreation } from "../../common/free-tier-validator";

/**
 * Server Action to get tags related to a shoe
 */
export async function getShoeRelatedTagsAction(shoeId: number) {
  return actionHandler(async () => {
    await validateAuthUserServerAction();
    return await svc.getShoeRelatedTags(shoeId);
  });
}

/**
 * Server Action to get a specific tag
 */
export async function getTagByIdAction(params: { id: number; shoeId: number }) {
  return actionHandler(async () => {
    await validateAuthUserServerAction();
    return await svc.getTagBy({
      id: params.id,
      shoeId: params.shoeId,
    });
  });
}

/**
 * Server Action to create a tag
 */
export async function createTagAction(data: unknown, shoeId: number) {
  return actionHandler(async () => {
    const user = await validateAuthUserServerAction();
    const payload = createTagSchema.parse(data);

    // Validate free tier
    await validateFreeTierForCreation(user.companyId);

    const tagId = await svc.createTag({
      ...payload,
      userId: user.id,
      companyId: user.companyId,
      shoeId,
    });

    return { tagId };
  });
}

/**
 * Server Action to update a tag
 */
export async function updateTagAction(data: unknown, tagId: number, shoeId: number) {
  return actionHandler(async () => {
    const user = await validateAuthUserServerAction();
    const payload = updateTagSchema.parse(data);

    await svc.updateTag({
      ...payload,
      id: tagId,
      shoeId: shoeId,
      userId: user.id,
    });

    return null;
  });
}

/**
 * Server Action to delete a tag
 */
export async function deleteTagAction(tagId: number, shoeId: number) {
  return actionHandler(async () => {
    await validateAuthUserServerAction();

    const payload = deleteTagSchema.parse({
      shoeId: shoeId.toString(),
      tagId: tagId.toString(),
    });

    await svc.deleteTag(payload);
    return null;
  });
}

