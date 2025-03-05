import * as svc from "@/app/api/_backend";

import { validateAuthUser } from "@/common";
import { NextRequest } from "next/server";

import { errorHandler } from "@/app/api/_backend/common/api.error";

const getRoleList = async (req: NextRequest) => {
  try {
    await validateAuthUser(req);

    const roles = await svc.getRoleList();
    return Response.json(roles, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

export { getRoleList as GET };
