import prisma from "../../prisma/prisma.client";
import * as t from "./_repo.types";

const getShoeRelatedTags = async (shoeId: number) => {
  return await prisma.customTag.findMany({
    where: { shoeId, deletedAt: null },
  });
};

const createShoeRelateTags = async () => {};

const getTagBy = async (data: t.GetTagBy) => {
  return await prisma.customTag.findFirstOrThrow({
    where: {
      id: data.id || undefined,
      sku: data.sku || undefined,
      shoeId: data.shoeId || undefined,
      deletedAt: null,
    },
  });
};

const createTag = async (data: t.CreateTag) => {
  const { id } = await prisma.customTag.create({
    data: {
      sku: data.sku,
      shoeId: data.shoeId,
      userId: data.userId,
      metadata: data.metadata,
    },
  });
  return id;
};

const updateTag = async (data: t.UpdateTag) => {
  await prisma.customTag.update({
    where: {
      id: data.id,
    },
    data: {
      sku: data.sku || undefined,
      shoeId: data.shoeId || undefined,
      userId: data.userId || undefined,
      metadata: data.metadata || undefined,
    },
  });
};

export {
  getShoeRelatedTags,
  createShoeRelateTags,
  getTagBy,
  createTag,
  updateTag,
};
