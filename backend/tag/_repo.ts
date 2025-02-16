import prisma from "../prisma";

const getShoeRelatedTags = async (shoeId: number) => {
  return await prisma.customTag.findMany({
    where: { shoeId, deletedAt: null },
  });
};

const createShoeRelateTags = async () => {};

export { getShoeRelatedTags, createShoeRelateTags };
