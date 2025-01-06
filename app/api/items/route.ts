import { NextRequest } from "next/server";

import { itemCreationSchema } from "@/schemas";
import * as svc from "@/backend";

const createItem = async (req: NextRequest) => {
  try {
    const payload = await itemCreationSchema.validate(await req.json());
    const itemId = await svc.createItem({
      sku: payload.sku,
      size: payload.size,
      price: payload.price,
      shoeId: payload.shoeId,
    });

    return Response.json({ itemId }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
};

export { createItem as POST };
