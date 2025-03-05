import { NextRequest } from "next/server";
import * as svc from "@/app/api/_backend";

import { updateShoeSchema } from "@/lib/schemas";
import { validateAuthUser } from "@/common";

type UserParams = {
  params: Promise<{ shoe_id: string }>;
};

const getShoesAndRelatedItemsPaginated = async (
  req: NextRequest,
  { params }: UserParams
) => {
  try {
    await validateAuthUser(req);

    const shoeId = parseInt((await params).shoe_id, 10);
    const shoe = await svc.getShoeBy({ id: shoeId });

    return Response.json(shoe, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
};

const deleteShoe = async (req: NextRequest, { params }: UserParams) => {
  try {
    const user = await validateAuthUser(req);

    const shoeId = parseInt((await params).shoe_id, 10);
    await svc.deleteShoe(shoeId);
    await svc.createAudit({
      userId: user!.id,
      note: `O usuário deletou o calçado #${shoeId}`,
    });

    return Response.json(null, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
};

const updateShoe = async (req: NextRequest, { params }: UserParams) => {
  try {
    const user = await validateAuthUser(req);

    const payload = {
      ...(await req.json()),
      id: parseInt((await params).shoe_id, 10),
    };

    const result = updateShoeSchema.safeParse(payload);
    if (result.error)
      return Response.json({ errors: result.error.errors }, { status: 400 });

    await svc.updateShoe(result.data);
    await svc.createAudit({
      userId: user!.id,
      note: `O usuário editou as informações do calçado #${result.data.id}`,
    });

    return Response.json(null, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
};

export {
  getShoesAndRelatedItemsPaginated as GET,
  deleteShoe as DELETE,
  updateShoe as PUT,
};
