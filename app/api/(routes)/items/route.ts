import { NextRequest } from "next/server";

import { itemCreationSchema } from "@/lib/schemas";
import * as svc from "@/app/api/_backend";

import { errorHandler } from "@/app/api/_backend/common/api.error";

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
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

export { createItem as POST };
