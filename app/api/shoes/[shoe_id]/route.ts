import { NextRequest } from 'next/server';
import * as svc from '@/backend/services'
import { itemUpdateSchema } from '@/schemas';

type UserParams = {
  params: Promise<{ shoe_id: string }>
}

const getShoeById = async (req: NextRequest, { params }: UserParams) => {
  try {
    const shoeId = parseInt((await params).shoe_id, 10)
    const shoe = await svc.getShoeBy({ id: shoeId })

    return Response.json(shoe, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

const deleteShoe = async (req: NextRequest, { params }: UserParams) => {
  try {
    const shoeId = parseInt((await params).shoe_id, 10)
    await svc.deleteShoe(shoeId)

    return Response.json(null, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

const updateShoe = async (req: NextRequest, { params }: UserParams) => {
  try {
    const payload = {
      ...(await req.json()),
      id: parseInt((await params).shoe_id, 10)
    }
    const result = await itemUpdateSchema.validate(payload, { abortEarly: false });
    await svc.updateShoe(result)

    return Response.json(null, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

export {
  deleteShoe as DELETE,
  updateShoe as PUT,
  getShoeById as GET,
}