import * as repo from "./_repo";

const getShoeRelatedTags = async (shoeId: number) => {
  return repo.getShoeRelatedTags(shoeId);
};

const createShoeRelateTags = async () => {};

export { getShoeRelatedTags, createShoeRelateTags };
