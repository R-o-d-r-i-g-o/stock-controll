import { prisma, prismaTransaction } from "../prisma";
import moment from "moment";
import * as t from "./_repo.types";

const getShoeBy = async (filter: t.getShoeBy) => {
  const shoe = await prisma.shoe.findFirstOrThrow({
    where: {
      id: filter.id || undefined,
      name: filter.name || undefined,
    },
    include: {
      Item: {
        where: {
          deletedAt: null,
          Expedition: { none: {} },
        },
        orderBy: { size: "asc" },
      },
    },
  });

  return shoe;
};

const getItemShoesCount = async (filter: t.getShoesPaginated) => {
  const itemsGroupedByShoe = await prisma.shoe.count({
    where: {
      deletedAt: null,
      createdAt: {
        gte: filter.startDate,
        lte: filter.endDate,
      },
    },
  });

  return itemsGroupedByShoe;
};

const getItemShoesPaginated = async (filter: t.getShoesPaginated) => {
  const itemsGroupedByShoe = await prisma.shoe.findMany({
    skip: filter.skip,
    take: filter.take,
    where: {
      deletedAt: null,
      createdAt: {
        gte: filter.startDate,
        lte: filter.endDate,
      },
    },
    include: {
      Item: {
        where: { deletedAt: null },
        orderBy: { size: "asc" },
      },
    },
  });
  return itemsGroupedByShoe;
};

const deleteShoe = async (id: number) => {
  return await prismaTransaction(async () => {
    const deletedShoe = await prisma.shoe.update({
      where: { id },
      data: { deletedAt: moment.utc().toDate() },
    });
    return deletedShoe;
  });
};

const updateShoe = async (user: t.updateShoe) => {
  return await prismaTransaction(async () => {
    await prisma.shoe.update({
      where: { id: user.id },
      data: {
        name: user.name || undefined,
        sole: user.sole || undefined,
        note: user.note || undefined,
        color: user.color || undefined,
      },
    });
  });
};

const createShoe = async (data: t.createShoe) => {
  const { id } = await prisma.shoe.create({
    data: {
      name: data.name,
      sole: data.sole,
      note: data.note,
      color: data.color,
    },
  });
  return id;
};

export {
  deleteShoe,
  updateShoe,
  createShoe,
  getShoeBy,
  getItemShoesCount,
  getItemShoesPaginated,
};
