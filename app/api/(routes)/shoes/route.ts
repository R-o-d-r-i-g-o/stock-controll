import { NextRequest } from "next/server";
import * as svc from "@/app/api/_backend";

import auditSvc from "@/app/api/_backend/features/audit/audit.svc";
import { errorHandler } from "@/app/api/_backend/common/api.error";

import { createShoeSchema } from "@/lib/schemas";
import { validateAuthUser } from "@/common";

const getShoesAndItemsPaginated = async (req: NextRequest) => {
  try {
    await validateAuthUser(req);

    const searchParams = req.nextUrl.searchParams;
    const payload = {
      page: parseInt(searchParams.get("page") ?? "1"),
      size: parseInt(searchParams.get("size") ?? "10"),
    };

    const groupedItems = await svc.getShoesGroupedBySizePaginated(payload);
    return Response.json(groupedItems, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

const createShoe = async (req: NextRequest) => {
  try {
    const user = await validateAuthUser(req);

    const result = createShoeSchema.safeParse(await req.json());
    if (result.error)
      return Response.json({ errors: result.error.errors }, { status: 400 });

    const shoeId = await svc.createShoe(result.data);
    await auditSvc.createAuditRecord({
      userId: user!.id,
      note: `O usuário cadastrou um novo calçado (#${shoeId})`,
    });

    return Response.json({ shoeId }, { status: 201 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

export { getShoesAndItemsPaginated as GET, createShoe as POST };
