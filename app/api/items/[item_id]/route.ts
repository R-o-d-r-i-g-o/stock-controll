import { NextRequest } from "next/server";
import * as svc from "@/backend";
import { itemUpdateSchema } from "@/schemas";

type UserParams = {
  params: Promise<{ item_id: string }>;
};

const getItemById = async (req: NextRequest, { params }: UserParams) => {
  try {
    const item_id = parseInt((await params).item_id, 10);
    const item = await svc.getItemBy({ id: item_id });

    return Response.json(item, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

const deleteItem = async (req: NextRequest, { params }: UserParams) => {
  try {
    const itemId = parseInt((await params).item_id, 10);
    await svc.deleteItem(itemId);

    return Response.json(null, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

const updateItem = async (req: NextRequest, { params }: UserParams) => {
  try {
    const payload = {
      ...(await req.json()),
      id: parseInt((await params).item_id, 10),
    };
    const result = await itemUpdateSchema.validate(payload);
    await svc.updateItem(result);

    return Response.json(null, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

export { deleteItem as DELETE, updateItem as PUT, getItemById as GET };
