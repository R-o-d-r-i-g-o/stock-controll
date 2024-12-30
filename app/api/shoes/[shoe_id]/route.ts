import { NextRequest } from "next/server";
import * as svc from "@/backend";
import { updateShoeSchema } from "@/schemas";

type UserParams = {
  params: Promise<{ shoe_id: string }>;
};

const getCategoriesAndRelatedShoesPaginated = async (
  req: NextRequest,
  { params }: UserParams
) => {
  try {
    const shoeId = parseInt((await params).shoe_id, 10);
    const shoe = await svc.getShoeBy({ id: shoeId });

    return Response.json(shoe, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

const deleteShoe = async (req: NextRequest, { params }: UserParams) => {
  try {
    const shoeId = parseInt((await params).shoe_id, 10);
    await svc.deleteShoe(shoeId);

    return Response.json(null, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

const updateShoe = async (req: NextRequest, { params }: UserParams) => {
  try {
    const payload = {
      ...(await req.json()),
      id: parseInt((await params).shoe_id, 10),
    };

    const result = await updateShoeSchema.validate(payload);
    await svc.updateShoe(result);

    return Response.json(null, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

export {
  getCategoriesAndRelatedShoesPaginated as GET,
  deleteShoe as DELETE,
  updateShoe as PUT,
};
