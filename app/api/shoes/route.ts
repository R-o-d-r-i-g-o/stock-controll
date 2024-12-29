import { NextRequest } from "next/server";
import * as svc from "@/backend";

import { createCategoryValdiationSchema } from "@/schemas";

const getCategoriesAndRelatedShoesPaginated = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const payload = {
      page: parseInt(searchParams.get("page") ?? "1"),
      size: parseInt(searchParams.get("size") ?? "10"),
    };

    const groupedShoes = await svc.getShoesGroupedByCategoryPaginated(payload);
    return Response.json(groupedShoes, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

const createCategory = async (req: NextRequest) => {
  try {
    const payload = await createCategoryValdiationSchema.validate(
      await req.json(),
      { abortEarly: false }
    );
    const categoryId = await svc.createCategory({
      name: payload.name,
      sole: payload.sole,
      note: payload.note,
      color: payload.color,
    });

    return Response.json({ categoryId }, { status: 201 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

export { getCategoriesAndRelatedShoesPaginated as GET, createCategory as POST };
