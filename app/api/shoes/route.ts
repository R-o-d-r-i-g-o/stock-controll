import { NextRequest } from "next/server";
import * as svc from "@/backend";

import { createShoeSchema } from "@/schemas";

const getShoesAndItemsPaginated = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const payload = {
      page: parseInt(searchParams.get("page") ?? "1"),
      size: parseInt(searchParams.get("size") ?? "10"),
    };

    const groupedItems = await svc.getShoesGroupedBySizePaginated(payload);
    return Response.json(groupedItems, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

const createShoe = async (req: NextRequest) => {
  try {
    const payload = await createShoeSchema.validate(await req.json());
    const shoeId = await svc.createShoe({
      name: payload.name,
      sole: payload.sole,
      note: payload.note,
      color: payload.color,
    });

    return Response.json({ shoeId }, { status: 201 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

export { getShoesAndItemsPaginated as GET, createShoe as POST };
