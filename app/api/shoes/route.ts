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
    const result = createShoeSchema.safeParse(await req.json());
    if (result.error)
      return Response.json({ errors: result.error.errors }, { status: 400 });

    const shoeId = await svc.createShoe(result.data);
    return Response.json({ shoeId }, { status: 201 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

export { getShoesAndItemsPaginated as GET, createShoe as POST };
