import { cachedApi } from './_api'
import * as t from './_types'

const getShoesGroupedByCategoryPaginated = async (req: t.GetShoesGroupedByCategoryPaginated) => {
  const res = await cachedApi.get<t.GetShoesGroupedByCategoryPaginatedRespose>("/api/categories", {
    params: req
  });
  return res.data;
};

export { getShoesGroupedByCategoryPaginated };