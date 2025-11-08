import { api } from "../api";
import * as t from "./_types";

// Note: GET operation (getItemById) has been migrated to Server Actions
// See: app/api/_backend/features/item/item.actions.ts

const debitItemsFromStorage = async (data: t.debitItemsFromStorage) => {
  const res = await api.post<t.GetItemById[]>("/api/items/scan", data);
  return res.data;
};

const deleteItemById = async (id: number) => {
  const res = await api.delete<t.GetItemById>(`/api/items/${id}`);
  return res.data;
};

const createItem = async (data: t.CreateItem) => {
  const res = await api.post("/api/items", data);
  return res.data;
};

const updateItem = async (data: t.UpdateItem) => {
  const res = await api.put(`/api/items/${data.id}`, {
    sku: data.sku,
    size: data.size,
    price: data.price,
    shoeId: data.shoeId,
  });
  return res.data;
};

export { debitItemsFromStorage, deleteItemById, createItem, updateItem };
