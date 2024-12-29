import { NextRequest } from "next/server";
import * as svc from "@/backend";
import { itemUpdateSchema } from "@/schemas";

type UserParams = {
  params: Promise<{ item_id: string }>;
};

const getShoeById = async (req: NextRequest, { params }: UserParams) => {
  try {
    const item_id = parseInt((await params).item_id, 10);
    const shoe = await svc.getItemBy({ id: item_id });

    return Response.json(shoe, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

const deleteShoe = async (req: NextRequest, { params }: UserParams) => {
  try {
    const itemId = parseInt((await params).item_id, 10);
    await svc.deleteItem(itemId);

    return Response.json(null, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

const updateShoe = async (req: NextRequest, { params }: UserParams) => {
  try {
    const payload = {
      ...(await req.json()),
      id: parseInt((await params).item_id, 10),
    };
    const result = await itemUpdateSchema.validate(payload, {
      abortEarly: false,
    });
    await svc.updateItem(result);

    return Response.json(null, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

export { deleteShoe as DELETE, updateShoe as PUT, getShoeById as GET };
