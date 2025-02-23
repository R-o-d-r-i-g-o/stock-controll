import { NextRequest } from "next/server";
import * as svc from "@/backend";

import { validateAuthUser } from "@/common";
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

export { getUniqueTag as GET };
