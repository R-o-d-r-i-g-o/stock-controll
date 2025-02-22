import { NextRequest } from "next/server";
import * as svc from "@/backend";
import { itemUpdateSchema } from "@/lib/schemas";

import { validateAuthUser } from "@/common";

type UserParams = {
  params: Promise<{ item_id: string }>;
};

const getItemById = async (req: NextRequest, { params }: UserParams) => {
  try {
    await validateAuthUser(req);

    const itemId = parseInt((await params).item_id, 10);
    const item = await svc.getItemBy({ id: itemId });

    return Response.json(item, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
};

const deleteItem = async (req: NextRequest, { params }: UserParams) => {
  try {
    const user = await validateAuthUser(req);
    const itemId = parseInt((await params).item_id, 10);

    await svc.deleteItem(itemId);
    await svc.createAudit({
      userId: user!.id,
      itemId: itemId,
      note: "O usuário deletou o item",
    });
    return Response.json(null, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
};

const updateItem = async (req: NextRequest, { params }: UserParams) => {
  try {
    const user = await validateAuthUser(req);

    const payload = {
      ...(await req.json()),
      id: parseInt((await params).item_id, 10),
    };
    const result = await itemUpdateSchema.validate(payload);

    await svc.updateItem(result);
    await svc.createAudit({
      userId: user!.id,
      itemId: result.id,
      note: "O usuário atualizou as informações do item",
    });
    return Response.json(null, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
};

export { deleteItem as DELETE, updateItem as PUT, getItemById as GET };
