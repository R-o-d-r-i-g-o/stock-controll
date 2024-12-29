import { NextRequest } from "next/server";
import * as svc from "@/backend";
import { updateCategoryValdiationSchema } from "@/schemas";

type UserParams = {
  params: Promise<{ shoe_id: string }>;
};

const getCategoriesAndRelatedShoesPaginated = async (
  req: NextRequest,
  { params }: UserParams
) => {
  try {
    const categoryId = parseInt((await params).shoe_id, 10);
    const category = await svc.getCategoryBy({ id: categoryId });

    return Response.json(category, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

const deleteCategory = async (req: NextRequest, { params }: UserParams) => {
  try {
    const categoryId = parseInt((await params).shoe_id, 10);
    await svc.deleteCategory(categoryId);

    return Response.json(null, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

const updateCategory = async (req: NextRequest, { params }: UserParams) => {
  try {
    const payload = {
      ...(await req.json()),
      id: parseInt((await params).shoe_id, 10),
    };

    const result = await updateCategoryValdiationSchema.validate(payload);
    await svc.updateCategory(result);

    return Response.json(null, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

export {
  getCategoriesAndRelatedShoesPaginated as GET,
  deleteCategory as DELETE,
  updateCategory as PUT,
};
