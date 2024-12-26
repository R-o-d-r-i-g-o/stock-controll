import { NextRequest } from 'next/server';

import { updateUserSchema } from '@/schemas'
import * as svc from '@/backend/services'

type UserParams = {
  params: Promise<{ user_id: string }>
}

const getUserByID = async (req: NextRequest, { params }: UserParams) => {
  try {
    const userId = parseInt((await params).user_id, 10)
    const user = await svc.getUserBy({ id: userId })

    return Response.json(user, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

const deleteUser = async (req: NextRequest, { params }: UserParams) => {
  try {
    const userId = parseInt((await params).user_id, 10)
    await svc.deleteUser(userId)

    return Response.json(null, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

const updateUser = async (req: NextRequest, { params }: UserParams) => {
  try {
    const payload = {
      ...(await req.json()),
      id: parseInt((await params).user_id, 10)
    }
    const result = await updateUserSchema.validate(payload, { abortEarly: false });
    await svc.updateUser({
      ...result,
      password: result.password ?? "",
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