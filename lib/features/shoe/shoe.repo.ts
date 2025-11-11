import moment from "moment";

import * as t from "./shoe.types";
import { prisma } from "../../prisma/prisma.client";

type ShoeRepository = {
  getShoeBy(filter: t.getShoeBy): t.GetShoeByRepoOutput;
  getItemShoesCount(filter: t.getShoesPaginated): Promise<number>;
  deleteShoe(id: number): Promise<void>;
  updateShoe(user: t.updateShoe): Promise<void>;
  createShoe(data: t.createShoe): Promise<number>;
  getItemShoesPaginated(filter: t.getShoesPaginated): t.GetItemShoesPaginatedRepoOutput;
  getExpeditionShoes(filter: t.getExpeditionShoes): t.GetExpeditionShoesRepoOutput;
  getShoesItemsSummary(companyId: number): Promise<t.GetShoesItemsSummaryOutput[]>;
};

const shoeRepository = {} as ShoeRepository;

shoeRepository.getShoeBy = async (filter) => {
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

shoeRepository.getItemShoesCount = async (filter) => {
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

shoeRepository.getItemShoesPaginated = async (filter) => {
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

shoeRepository.getExpeditionShoes = async (filter) => {
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

shoeRepository.getShoesItemsSummary = async (companyId: number) => {
  const result = await prisma.shoe.findMany({
    where: {
      companyId,
      deletedAt: null,
    },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          Item: {
            where: {
              deletedAt: null,
              Expedition: { none: {} },
            },
          },
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return result.map((shoe) => ({
    id: shoe.id,
    name: shoe.name,
    itemsCount: shoe._count.Item,
  }));
};

shoeRepository.deleteShoe = async (id) => {
  await prisma.shoe.update({
    where: { id },
    data: { deletedAt: moment.utc().toDate() },
  });
};

shoeRepository.updateShoe = async (user) => {
  await prisma.shoe.update({
    where: { id: user.id },
    data: {
      name: user.name || undefined,
      sole: user.sole || undefined,
      note: user.note || undefined,
      color: user.color || undefined,
    },
  });
};

shoeRepository.createShoe = async (data) => {
  const { id } = await prisma.shoe.create({
    data: {
      name: data.name,
      sole: data.sole,
      note: data.note,
      color: data.color,
      companyId: data.companyId,
    },
  });
  return id;
};

export default shoeRepository;
