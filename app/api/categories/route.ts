import { NextRequest } from 'next/server';
import * as svc from '@/backend/services'

const getCategoriesAndRelatedShoesPaginated = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const payload = {
      page: parseInt(searchParams.get("page") ?? "1"),
      size: parseInt(searchParams.get("size") ?? "10")
    }

    const groupedShoes = await svc.getShoesGroupedByCategoryPaginated(payload)
    return Response.json(groupedShoes, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export { getCategoriesAndRelatedShoesPaginated as GET }