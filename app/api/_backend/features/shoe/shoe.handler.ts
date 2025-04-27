import { NextRequest } from "next/server";

import shoeSvc from "./shoe.svc";
import auditSvc from "../audit/audit.svc";

import { errorHandler } from "../../common/api.error";

import { createShoeSchema, updateShoeSchema } from "./shoe.schema";

import { validateAuthUser } from "../../common/api.auth";

type UserParams = {
  params: Promise<{ shoe_id: string }>;
};

const getShoesAndItemsPaginated = async (req: NextRequest) => {
  try {
    await validateAuthUser(req);

    const searchParams = req.nextUrl.searchParams;
    const payload = {
      page: parseInt(searchParams.get("page") ?? "1"),
      size: parseInt(searchParams.get("size") ?? "10"),
    };

    const groupedItems = await shoeSvc.getShoesGroupedBySizePaginated(payload);
    return Response.json(groupedItems, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

const createShoe = async (req: NextRequest) => {
  try {
    const user = await validateAuthUser(req);

    const result = createShoeSchema.safeParse(await req.json());
    if (result.error) return Response.json({ errors: result.error.errors }, { status: 400 });

    const shoeId = await shoeSvc.createShoe(result.data);
    await auditSvc.createAuditRecord({
      userId: user.id,
      note: `O usuário cadastrou um novo calçado (#${shoeId})`,
    });

    return Response.json({ shoeId }, { status: 201 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

const getShoesAndRelatedItemsPaginated = async (req: NextRequest, { params }: UserParams) => {
  try {
    await validateAuthUser(req);

    const shoeId = parseInt((await params).shoe_id, 10);
    const shoe = await shoeSvc.getShoeBy({ id: shoeId });

    return Response.json(shoe, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

const deleteShoe = async (req: NextRequest, { params }: UserParams) => {
  try {
    const user = await validateAuthUser(req);

    const shoeId = parseInt((await params).shoe_id, 10);
    await shoeSvc.deleteShoe(shoeId);
    await auditSvc.createAuditRecord({
      userId: user.id,
      note: `O usuário deletou o calçado #${shoeId}`,
    });

    return Response.json(null, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
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
    if (result.error) return Response.json({ errors: result.error.errors }, { status: 400 });

    await shoeSvc.updateShoe(result.data);
    await auditSvc.createAuditRecord({
      userId: user.id,
      note: `O usuário editou as informações do calçado #${result.data.id}`,
    });

    return Response.json(null, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

export { getShoesAndItemsPaginated, createShoe, getShoesAndRelatedItemsPaginated, deleteShoe, updateShoe };
