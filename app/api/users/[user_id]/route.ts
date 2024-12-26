import { NextRequest } from 'next/server';

import { createUserSchema } from '@/schemas'
import * as svc from '@/backend/services'

type UserParams = {
  params: Promise<{ user_id: string }>
}

const getUserByID = async (req: NextRequest, { params }: UserParams) => {
  try {
    const userId = parseInt((await params).user_id, 10)
    const user = await svc.getUserBy({ id: userId })

    return Response.json({ user }, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

const deleteUser = async (req: NextRequest, { params }: UserParams) => {
  try {
    const userId = parseInt((await params).user_id, 10)
    await svc.deleteUser(userId)

    return Response.json(null, { status: 204 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

const updateUser = async (req: NextRequest, { params }: UserParams) => {
  try {
    const userId = parseInt((await params).user_id, 10)
    const payload = await createUserSchema.validate(await req.json(), { abortEarly: false });
    await svc.updateUser({
      id: userId,
      name: payload.name,
      email: payload.email,
      role_id: payload.role_id,
      password: payload.password,
    })

    return Response.json(null, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

export {
  updateUser as PUT,
  deleteUser as DELETE,
  getUserByID as GET,
}