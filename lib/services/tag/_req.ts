import { api } from "../api";
import * as t from "./_types";

// Note: GET operations (getShoeRelatedTags, getShoeRelatedTag) have been migrated to Server Actions
// See: app/api/_backend/features/tag/tag.actions.ts

const createShoeRelatedTag = async (data: t.CreateShoeRelatedTag) => {
  const res = await api.post<t.GetShoeRelatedTagReponse>(`/api/shoes/${data.shoeId}/tags`, data.payload);
  return res.data;
};

const updateTag = async (data: t.UpdateTag) => {
  const res = await api.put(`/api/shoes/${data.shoeId}/tags/${data.id}`, data);
  return res.data;
};

const deleteTag = async ({ shoeId, tagId }: t.DeleteTag) => {
  await api.delete(`/api/shoes/${shoeId}/tags/${tagId}`);
};

export { createShoeRelatedTag, deleteTag, updateTag };
