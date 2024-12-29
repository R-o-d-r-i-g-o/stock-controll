import { api } from "../api";
import * as t from "./_types";

// Fetches a paginated list of shoes grouped by category.
const getShoesGroupedByCategoryPaginated = async (
  req: t.GetShoesGroupedByCategoryPaginated
) => {
  const res = await api.get<t.GetShoesGroupedByCategoryPaginatedRespose>(
    "/api/categories",
    {
      params: req,
    }
  );
  return res.data;
};

// Retrieves category details by its ID.
const getCategoryById = async (id: number) => {
  const res = await api.get<t.GetCategoryByIdResponse>(`/api/categories/${id}`);
  return res.data;
};

// Deletes a category by its ID.
const deleteCategoryById = async (id: number) => {
  const res = await api.delete(`/api/categories/${id}`);
  return res.data;
};

// Updates an existing category with new data.
const updateCategory = async (req: t.UpdateCategory) => {
  const res = await api.put(`/api/categories/${req.id}`, {
    name: req.name,
    sole: req.sole,
    note: req.note,
    color: req.color,
  });
  return res.data;
};

// Creates a new category.
const createCategory = async (req: t.CreateCategory) => {
  const res = await api.post("/api/categories", req);
  return res.data;
};

export {
  getShoesGroupedByCategoryPaginated,
  createCategory,
  updateCategory,
  deleteCategoryById,
  getCategoryById,
};
