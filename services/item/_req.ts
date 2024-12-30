import { api } from "../api";
import * as t from "./_types";

const getItemById = async (id: number) => {
  const res = await api.get<t.GetItemById>(`/api/items/${id}`);
  return res.data;
};

const debitItemsFromStorage = async (skuList: string[]) => {
  const res = await api.post<t.GetItemById[]>("/api/items/debit", { skuList });
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

export {
  getItemById,
  debitItemsFromStorage,
  deleteItemById,
  createItem,
  updateItem,
};
