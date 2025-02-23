import * as repo from "./_repo";
import * as t from "./_svc.types";

const getShoeRelatedTags = async (shoeId: number) => {
  const tags = await repo.getShoeRelatedTags(shoeId);

  return {
    meta: {
      shoeId,
      total: tags?.length ?? 0,
    },
    tags,
  };
};

const createShoeRelateTags = async () => {};

const getTagBy = async (data: t.GetTagBy) => {
  return await repo.getTagBy(data);
};

const createTag = async (data: t.CreateTag) => {
  const tagId = await repo.createTag(data);
  return tagId;
};

const updateTag = async (data: t.UpdateTag) => {
  await repo.updateTag(data);
};

export {
  getShoeRelatedTags,
  createShoeRelateTags,
  getTagBy,
  createTag,
  updateTag,
};
