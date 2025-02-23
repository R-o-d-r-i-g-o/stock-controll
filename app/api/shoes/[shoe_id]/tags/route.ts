import { NextRequest } from "next/server";
import * as svc from "@/backend";

import { validateAuthUser } from "@/common";
import { createTagSchema } from "@/lib/schemas/tag";

type UserParams = {
  params: Promise<{ shoe_id: string }>;
};

const getShoeRelatedTags = async (req: NextRequest, { params }: UserParams) => {
  try {
    await validateAuthUser(req);

    const shoeId = parseInt((await params).shoe_id, 10);
    const tags = await svc.getShoeRelatedTags(shoeId);

    return Response.json(tags, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
};

const createShoeRelatedTags = async (
  req: NextRequest,
  { params }: UserParams
) => {
  const user = await validateAuthUser(req);
  const shoeId = parseInt((await params).shoe_id, 10);

  const result = createTagSchema.safeParse(await req.json());
  if (result.error)
    return Response.json({ errors: result.error.errors }, { status: 400 });

  const tagId = await svc.createTag({
    ...result.data,
    userId: user!.id,
    shoeId,
  });

  return Response.json({ tagId }, { status: 200 });
};

export { getShoeRelatedTags as GET, createShoeRelatedTags as POST };
