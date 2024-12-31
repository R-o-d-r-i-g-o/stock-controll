import { NextRequest } from "next/server";
import * as svc from "@/backend";

import { updateUserSchema } from "@/schemas";
import { validateAuthUser } from "@/common";

type UserParams = {
  params: Promise<{ user_id: string }>;
};

const getUserByID = async (req: NextRequest, { params }: UserParams) => {
  try {
    await validateAuthUser(req);

    const userId = parseInt((await params).user_id, 10);
    const user = await svc.getUserBy({ id: userId });

    return Response.json(user, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

const deleteUser = async (req: NextRequest, { params }: UserParams) => {
  try {
    const user = await validateAuthUser(req);

    const userId = parseInt((await params).user_id, 10);
    await svc.deleteUser(userId);
    await svc.createAudit({
      userId: user.id,
      note: `O usuário deletou o registro de usuário #${userId}`,
    });

    return Response.json(null, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

const updateUser = async (req: NextRequest, { params }: UserParams) => {
  try {
    const userId = await validateAuthUser(req);

    const payload = {
      ...(await req.json()),
      id: parseInt((await params).user_id, 10),
    };
    const result = updateUserSchema.safeParse(payload);
    if (result.error)
      return Response.json({ errors: result.error.errors }, { status: 400 });

    await svc.updateUser(result.data);
    await svc.createAudit({
      userId: userId.id,
      note: `O usuário atualizou os dadas do usuário #${userId}`,
    });

    return Response.json(null, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

export { updateUser as PUT, deleteUser as DELETE, getUserByID as GET };
