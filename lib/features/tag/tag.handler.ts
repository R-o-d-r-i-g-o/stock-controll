import { NextRequest } from "next/server";
import * as svc from "./tag.svc";

import { errorHandler } from "../../common/api.error";
import { validateAuthUser } from "../../common/api.auth";
import { deleteTagSchema, createTagSchema, updateTagSchema } from "./tag.schema";

type UserParams = {
  params: Promise<{ shoe_id: string }>;
};

type TagParams = {
  params: Promise<{
    tag_id: string;
    shoe_id: string;
  }>;
};

const getShoeRelatedTags = async (req: NextRequest, { params }: UserParams) => {
  try {
    await validateAuthUser(req);

    const shoeId = parseInt((await params).shoe_id, 10);
    const tags = await svc.getShoeRelatedTags(shoeId);

    return Response.json(tags, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

const createShoeRelatedTags = async (req: NextRequest, { params }: UserParams) => {
  const user = await validateAuthUser(req);
  const shoeId = parseInt((await params).shoe_id, 10);

  const result = createTagSchema.safeParse(await req.json());
  if (result.error) return Response.json({ errors: result.error.errors }, { status: 400 });

  const tagId = await svc.createTag({
    ...result.data,
    userId: user.id,
    companyId: user.companyId,
    shoeId,
  });

  return Response.json({ tagId }, { status: 200 });
};

const getUniqueTag = async (req: NextRequest, { params }: TagParams) => {
  try {
    await validateAuthUser(req);
    const { tag_id, shoe_id } = await params;

    const tag = await svc.getTagBy({
      id: parseInt(tag_id, 10),
      shoeId: parseInt(shoe_id, 10),
    });

    return Response.json(tag, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

const deleteTag = async (req: NextRequest, { params }: TagParams) => {
  try {
    await validateAuthUser(req);
    const { tag_id, shoe_id } = await params;

    const result = deleteTagSchema.safeParse({
      shoeId: shoe_id,
      tagId: tag_id,
    });
    if (result.error) return Response.json({ errors: result.error.errors }, { status: 400 });

    await svc.deleteTag(result.data);

    return Response.json(null, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

const updateTag = async (req: NextRequest, { params }: TagParams) => {
  try {
    const user = await validateAuthUser(req);
    const { tag_id, shoe_id } = await params;

    const result = updateTagSchema.safeParse(await req.json());
    if (result.error) return Response.json({ errors: result.error.errors }, { status: 400 });

    await svc.updateTag({
      ...result.data,
      id: parseInt(tag_id, 10),
      shoeId: parseInt(shoe_id, 10),
      userId: user.id,
    });

    return Response.json(null, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

export { getShoeRelatedTags, createShoeRelatedTags, getUniqueTag, deleteTag, updateTag };
