import { NextRequest } from 'next/server';
import * as svc from '@/backend/services'

type UserParams = {
  params: Promise<{ category_id: string }>
}

const getCategoriesAndRelatedShoesPaginated = async (req: NextRequest, { params }: UserParams) => {
  try {
    const categoryId = parseInt((await params).category_id, 10)
    const category = await svc.getCategoryBy({ id: categoryId })

    return Response.json(category, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export { getCategoriesAndRelatedShoesPaginated as GET }