import { api } from './_api'
import * as t from './_types'

const getShoeById = async (id: number) => {
  const res = await api.get<t.GetShoesById>(`/api/shoes/${id}`);
  return res.data;
};

export { getShoeById }