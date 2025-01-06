import { NextRequest } from "next/server";
import * as svc from "@/backend";

// import { validateAuthUser } from "@/common";

const getRoleList = async (req: NextRequest) => {
  try {
    // await validateAuthUser(req);

    const roles = await svc.getRoleList();
    return Response.json(roles, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

export { getRoleList as GET };
