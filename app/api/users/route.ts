import { NextRequest } from 'next/server';

import { createUserSchema } from '@/schemas'
import * as svc from '@/backend/services'

const createUser = async (req: NextRequest) => {
  try {
    const payload = await createUserSchema.validate(await req.json(), { abortEarly: false });
    const userID = await svc.createUser(payload)

    return Response.json({ user_id: userID }, { status: 201 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

const getUsersPaginated = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const payload = {
      page: parseInt(searchParams.get("page") ?? "1"),
      size: parseInt(searchParams.get("page") ?? "10")
    }

    const userList = await svc.getUsersPaginated(payload)
    return Response.json(userList, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export {
  createUser as POST,
  getUsersPaginated as GET
}