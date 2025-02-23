import { NextRequest } from "next/server";
import * as svc from "@/backend";

import { validateAuthUser } from "@/common";
import { updateTagSchema } from "@/lib/schemas/tag";

type UserParams = {
  params: Promise<{
    tag_id: string;
    shoe_id: string;
  }>;
};

const getUniqueTag = async (req: NextRequest, { params }: UserParams) => {
  try {
    await validateAuthUser(req);
    const { tag_id, shoe_id } = await params;

    const tag = await svc.getTagBy({
      id: parseInt(tag_id, 10),
      shoeId: parseInt(shoe_id, 10),
    });

    return Response.json(tag, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
};

const updateTag = async (req: NextRequest, { params }: UserParams) => {
  try {
    const user = await validateAuthUser(req);
    const { tag_id, shoe_id } = await params;

    const result = updateTagSchema.safeParse(await req.json());
    if (result.error)
      return Response.json({ errors: result.error.errors }, { status: 400 });

    await svc.updateTag({
      ...result.data,
      id: parseInt(tag_id, 10),
      shoeId: parseInt(shoe_id, 10),
      userId: user!.id,
    });

    return Response.json(null, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
};

export { getUniqueTag as GET, updateTag as PUT };
