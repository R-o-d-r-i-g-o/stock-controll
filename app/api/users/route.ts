import { NextRequest } from "next/server";

import { createUserSchema } from "@/schemas";
import * as svc from "@/backend";

const createUser = async (req: NextRequest) => {
  try {
    const result = createUserSchema.safeParse(await req.json());
    if (result.error)
      return Response.json({ errors: result.error.errors }, { status: 400 });

    const userId = await svc.createUser(result.data);
    return Response.json({ userId }, { status: 201 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

const getUsersPaginated = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const payload = {
      page: parseInt(searchParams.get("page") ?? "1"),
      size: parseInt(searchParams.get("size") ?? "10"),
    };

    const userList = await svc.getUsersPaginated(payload);
    return Response.json(userList, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

export { createUser as POST, getUsersPaginated as GET };
