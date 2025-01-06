import { NextRequest } from "next/server";
import * as svc from "@/backend";

const getUsersPaginated = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const payload = {
      page: parseInt(searchParams.get("page") ?? "1"),
      size: parseInt(searchParams.get("size") ?? "10"),
    };

    const auditList = await svc.getAuditsPaginated(payload);
    return Response.json(auditList, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
};

export { getUsersPaginated as GET };
