import { prisma, prismaTransaction } from "../../prisma/prisma.client";
import moment from "moment";
import * as t from "./item.types";

const findItemsByCustomTags = async (skus: string[]) => {
  const customTags = await prisma.customTag.findMany({
    where: { sku: { in: skus } },
    select: { metadata: true, shoeId: true },
  });

  const itemPromises = customTags.map((tag) =>
    prisma.item.findFirst({
      where: {
        ...(tag.metadata as { size: number; price: number }),
        shoeId: tag.shoeId,
        Expedition: { none: {} },
      },
      select: { id: true },
    })
  );

  const items = await Promise.all(itemPromises);
  return items.filter((item): item is { id: number } => item?.id != null);
};

const getItemBy = async (filter: t.GetShoeRepoInput) => {
  return await prisma.item.findFirstOrThrow({
    where: {
      id: filter.id || undefined,
      sku: filter.sku || undefined,
      size: filter.size || undefined,
      price: filter.price || undefined,
    },
  });
};

const createItem = async (shoe: t.CreateShoeRepoInput) => {
  return await prismaTransaction(async () => {
    const { id } = await prisma.item.create({
      data: {
        sku: shoe.sku,
        size: shoe.size,
        price: shoe.price,
        shoeId: shoe.shoeId,
      },
    });
    return id;
  });
};

const updateItem = async (data: t.UpdateShoeRepoInput) => {
  return await prismaTransaction(async () => {
    const shoe = await prisma.item.update({
      where: { id: data.id },
      data: {
        sku: data.sku || undefined,
        size: data.size || undefined,
        price: data.price || undefined,
        shoeId: data.shoeId || undefined,
      },
    });
    return shoe;
  });
};

const deleteItem = async (id: number) => {
  return await prismaTransaction(async () => {
    const deletedShoe = await prisma.item.update({
      where: { id },
      data: { deletedAt: moment.utc().toDate() },
    });
    return deletedShoe;
  });
};

const debitItems = async (data: t.DebitItemsRepoInput) => {
  const searchPredicate = {
    where: { sku: { in: data.skus } },
    select: { id: true },
  };

  const [itemsFromTag, itemsFromSku] = await Promise.all([
    findItemsByCustomTags(data.skus),
    prisma.item.findMany(searchPredicate),
  ]);

  const mixedItemIDs = [...itemsFromSku, ...itemsFromTag];
  const mixedItemIDsLen = mixedItemIDs.length;

  if (data.skus.length !== mixedItemIDsLen)
    throw new Error("nem todos itens escanados foram cadastrados");

  const itemsToExpedition = mixedItemIDs.map((item) => ({
    itemId: item.id,
    userId: data.userId,
    note: "item dado baixa no sistema",
  }));

  await prismaTransaction(
    async () => await prisma.expedition.createMany({ data: itemsToExpedition })
  );
};

const createItems = async (data: t.CreateItemsRepoInput) => {
  const customTags = await prisma.customTag.findMany({
    where: { sku: { in: data.skus } },
    select: { metadata: true, shoeId: true },
  });

  if (data.skus.length !== customTags.length)
    throw new Error("nem todas as etiquetas escanados foram encontradas");

  const itemsToCreate = customTags.map((ct) => ({
    ...(ct.metadata as { size: number; price: number }),
    shoeId: ct.shoeId,
  }));

  await prismaTransaction(
    async () => await prisma.item.createMany({ data: itemsToCreate })
  );
};

export {
  getItemBy,
  deleteItem,
  createItem,
  updateItem,
  debitItems,
  createItems,
};
