import { NextRequest } from "next/server";
import { errorHandler, launchError } from "../../common/api.error";

import auditSvc from "../audit/audit.svc";
import userSvc from "./user.svc";

import { createUserSchema, getUsersPaginatedSchema, updateUserSchema } from "./user.schema";

import { validateAuthUser } from "../../common/api.auth";

type UserParams = {
  params: Promise<{ user_id: string }>;
};

const createUser = async (req: NextRequest) => {
  try {
    const user = await validateAuthUser(req);

    const result = createUserSchema.safeParse(await req.json());
    if (result.error) return launchError(result.error.errors[0].message, 400).ToNextApiError();

    const userId = await userSvc.createUser(result.data);
    await auditSvc.createAuditRecord({
      userId: user!.id,
      note: `O usuário criou um registro de novo usuário (#${userId}).`,
    });
    return Response.json({ userId }, { status: 201 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

const getUsersPaginated = async (req: NextRequest) => {
  try {
    await validateAuthUser(req);

    const searchParams = req.nextUrl.searchParams;

    const result = getUsersPaginatedSchema.safeParse({
      page: searchParams.get("page"),
      size: searchParams.get("size"),
    });
    if (result.error) return launchError(result.error.errors[0].message, 400).ToNextApiError();

    const users = await userSvc.getUsersPaginated(result.data);
    return Response.json(users, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

const getUserByID = async (req: NextRequest, { params }: UserParams) => {
  try {
    await validateAuthUser(req);

    const userId = parseInt((await params).user_id, 10);
    const user = await userSvc.getUserBy({ id: userId });

    return Response.json(user, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

const deleteUser = async (req: NextRequest, { params }: UserParams) => {
  try {
    const user = await validateAuthUser(req);

    const userId = parseInt((await params).user_id, 10);
    await userSvc.deleteUser(userId);
    await auditSvc.createAuditRecord({
      userId: user!.id,
      note: `O usuário deletou o registro de usuário #${userId}`,
    });

    return Response.json(null, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
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
    if (result.error) return Response.json({ errors: result.error.errors }, { status: 400 });

    await userSvc.updateUser(result.data);
    await auditSvc.createAuditRecord({
      userId: userId!.id,
      note: `O usuário atualizou os dadas do usuário #${userId}`,
    });

    return Response.json(null, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

const getRoleList = async (req: NextRequest) => {
  try {
    await validateAuthUser(req);

    const roles = await userSvc.getRoleList();
    return Response.json(roles, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

export { createUser, getUsersPaginated, updateUser, deleteUser, getUserByID, getRoleList };
