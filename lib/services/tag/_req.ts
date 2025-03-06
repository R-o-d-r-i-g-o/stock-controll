import { api } from "../api";
import * as t from "./_types";

const getShoeRelatedTags = async ({ shoeId }: t.GetShoeRelatedTags) => {
  const res = await api.get<t.GetShoeRelatedTagsReponse>(
    `/api/shoes/${shoeId}/tags`
  );
  return res.data;
};

const getShoeRelatedTag = async ({ shoeId, tagId }: t.GetShoeRelatedTag) => {
  const res = await api.get<t.GetShoeRelatedTagReponse>(
    `/api/shoes/${shoeId}/tags/${tagId}`
  );
  return res.data;
};

const createShoeRelatedTag = async (data: t.CreateShoeRelatedTag) => {
  const res = await api.post<t.GetShoeRelatedTagReponse>(
    `/api/shoes/${data.shoeId}/tags`,
    data.payload
  );
  return res.data;
};

const updateTag = async (data: t.UpdateTag) => {
  const res = await api.put(`/api/shoes/${data.shoeId}/tags/${data.id}`, data);
  return res.data;
};

const deleteTag = async ({ shoeId, tagId }: t.DeleteTag) => {
  await api.delete(`/api/shoes/${shoeId}/tags/${tagId}`);
};

export {
  getShoeRelatedTags,
  getShoeRelatedTag,
  createShoeRelatedTag,
  deleteTag,
  updateTag,
};
