import { prisma, prismaTransaction } from "../../prisma/prisma.client";
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
        gte: filter.startDate || undefined,
        lte: filter.endDate || undefined,
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
        gte: filter.startDate || undefined,
        lte: filter.endDate || undefined,
      },
    },
    include: {
      Item: {
        where: { deletedAt: null, Expedition: { none: {} } },
        orderBy: { size: "asc" },
      },
    },
  });
  return itemsGroupedByShoe;
};

const getExpeditionShoes = async (filter: t.getExpeditionShoes) => {
  const formateDate = (date: Date) => moment(date).format("YYYY-MM-DD");

  const result = await prisma.$queryRaw<{ shoeName: string; amount: bigint }[]>`
    SELECT
      s.name   as "shoeName",
      COUNT(1) as "amount"
    FROM go_live.tb_expeditions e
    JOIN go_live.tb_items i ON e.item_id = i.id
    JOIN go_live.tb_shoes s ON i.shoe_id = s.id
    WHERE e.created_at >= CAST(${formateDate(filter.startDate)} AS DATE)
      AND e.created_at <= CAST(${formateDate(filter.endDate)} AS DATE)
    GROUP BY s.name;
  `;
  return result;
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
  getExpeditionShoes,
  getItemShoesPaginated,
};
