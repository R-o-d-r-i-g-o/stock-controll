import { cachedApi, api } from './_api'
import * as t from './_types'

const getShoesGroupedByCategoryPaginated = async (req: t.GetShoesGroupedByCategoryPaginated) => {
  const res = await cachedApi.get<t.GetShoesGroupedByCategoryPaginatedRespose>("/api/categories", {
    params: req
  });
  return res.data;
};

const getCategoryById = async (id: number) => {
  const res = await api.get<t.GetCategoryByIdResponse>(`/api/categories/${id}`);
  return res.data;
};

const deleteCategoryById = async (id: number) => {
  const res = await api.delete(`/api/categories/${id}`);
  return res.data;
}

const updateCategory = async (req: t.UpdateCategory) => {
  const res = await api.put(`/api/categories/${req.id}`, {
    params: req,
  });
  return res.data;
}

const createCategory = async (req: t.CreateCategory) => {
  const res = await api.post("/api/categories", req);
  return res.data;
}

export {
  getShoesGroupedByCategoryPaginated,
  createCategory,
  updateCategory,
  deleteCategoryById,
  getCategoryById
};