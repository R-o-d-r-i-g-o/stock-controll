import { NextRequest } from "next/server";
import * as svc from "@/backend";

import { validateAuthUser } from "@/common";

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

const createShoeRelatedTags = async () => {
  return Response.json(true, { status: 200 });
};

export { getShoeRelatedTags as GET, createShoeRelatedTags as POST };
