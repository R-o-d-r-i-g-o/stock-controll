import { api } from "../api";
import * as t from "./_types";

// Note: GET operations (getShoesGroupedByItemSizePaginated, getShoeById) have been migrated to Server Actions
// See: lib/backend/features/shoe/shoe.actions.ts

const deleteShoeById = async (id: number) => {
  const res = await api.delete(`/api/shoes/${id}`);
  return res.data;
};

const updateShoe = async (req: t.Updateshoe) => {
  const res = await api.put(`/api/shoes/${req.id}`, {
    name: req.name,
    sole: req.sole,
    note: req.note,
    color: req.color,
  });
  return res.data;
};

const createShoe = async (req: t.CreateShoe) => {
  const res = await api.post("/api/shoes", req);
  return res.data;
};

export { createShoe as createShoe, updateShoe as updateShoe, deleteShoeById as deleteShoeById };
