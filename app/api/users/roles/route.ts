import * as svc from "@/backend";

import { validateAuthUser } from "@/common";
import { NextRequest } from "next/server";

const getRoleList = async (req: NextRequest) => {
  try {
    await validateAuthUser(req);

    const roles = await svc.getRoleList();
    return Response.json(roles, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
};

export { getRoleList as GET };
