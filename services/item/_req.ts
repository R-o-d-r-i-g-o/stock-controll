import { api } from "../api";
import * as t from "./_types";

// Retrieves a shoe's details by its ID.
const getShoeById = async (id: number) => {
  const res = await api.get<t.GetShoesById>(`/api/shoes/${id}`);
  return res.data;
};

// Debits multiple shoes from storage using a list of SKUs.
const debitShoesFromStorage = async (skuList: string[]) => {
  const res = await api.post<t.GetShoesById>("/api/shoes/debit", { skuList });
  return res.data;
};

// Deletes a shoe from the database by its ID.
const deleteShoeById = async (id: number) => {
  const res = await api.delete<t.GetShoesById>(`/api/shoes/${id}`);
  return res.data;
};

// Creates a new shoe record in the database.
const createShoe = async (data: t.CreateShoe) => {
  const res = await api.post("/api/shoes", data);
  return res.data;
};

// Updates an existing shoe record with the provided details.
const updateShoe = async (data: t.UpdateShoe) => {
  const res = await api.put(`/api/shoes/${data.id}`, {
    sku: data.sku,
    size: data.size,
    price: data.size,
    categoryId: data.size,
  });
  return res.data;
};

export {
  getShoeById,
  debitShoesFromStorage,
  deleteShoeById,
  createShoe,
  updateShoe,
};
