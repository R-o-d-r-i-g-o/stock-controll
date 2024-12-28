import { api } from './_api'
import * as t from './_types'

const getShoeById = async (id: number) => {
  const res = await api.get<t.GetShoesById>(`/api/shoes/${id}`);
  return res.data;
};

const debitShoesFromStorage = async (SKUs: string[]) => {
  const res = await api.post<t.GetShoesById>("/api/shoes/debit", { SKUs });
  return res.data;
}

const deleteShoeById = async (id: number) => {
  const res = await api.delete<t.GetShoesById>(`/api/shoes/${id}`);
  return res.data;
};

export {
  getShoeById,
  debitShoesFromStorage,
  deleteShoeById
}