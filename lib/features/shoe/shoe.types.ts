import { Decimal } from "@prisma/client/runtime/library";
import { ItemEntity, ShoeEntity } from "../../prisma/prisma.entity";

type getShoeBy = {
  id?: number;
  name?: string;
};

type getShoesGroupedByItemSizePaginatedRespose = {
  meta: {
    page: number;
    size: number;
    total: number;
    startDate?: Date;
    endDate?: Date;
  };
  shoes: {
    id: number;
    name: string;
    sole: string;
    note: string;
    color: string;
    createdAt: string;
    deletedAt: string | null;
    groupedItems: {
      size: number;
      items: {
        id: number;
        price: number;
      }[];
    }[];
  }[];
};

type GetShoeBySvcOutput = Promise<{
  id: number;
  name: string;
  sole: string;
  color: string;
  note: string;
  createdAt: string;
  deletedAt: string | null;
  items: {
    id: number;
    sku: string;
    size: number;
    price: number;
    createdAt: string;
    deletedAt: string | null;
  }[];
}>;

type GetExpeditionShoesSvcOutput = Promise<
  {
    shoeName: string;
    amount: bigint;
  }[]
>;

type GetExpeditionShoesRepoOutput = Promise<
  {
    shoeName: string;
    amount: bigint;
  }[]
>;

type GetShoeByRepoOutput = Promise<
  ShoeEntity & {
    Item: ItemEntity[];
  }
>;

type GetItemShoesPaginatedRepoOutput = Promise<
  {
    id: number;
    color: string;
    sole: string;
    name: string;
    note: string;
    createdAt: Date;
    deletedAt: Date | null;
    Item: {
      id: number;
      createdAt: Date;
      deletedAt: Date | null;
      size: number;
      sku: string;
      price: Decimal;
      shoeId: number;
    }[];
  }[]
>;

type getShoesGroupedBySizePaginated = {
  page: number;
  size: number;
  startDate?: Date;
  endDate?: Date;
};

type createShoe = {
  color: string;
  sole: string;
  name: string;
  note: string;
  companyId: number;
};

type updateShoe = {
  id: number;
  color?: string;
  sole?: string;
  name?: string;
  note?: string;
};

type getExpeditionShoes = {
  startDate: Date;
  endDate: Date;
};

type Accumulator = {
  [size: number]: { size: number; items: { id: number; price: number }[] };
};

type getShoesPaginated = {
  skip: number;
  take: number;
  startDate?: Date;
  endDate?: Date;
};

export type {
  updateShoe,
  createShoe,
  GetShoeByRepoOutput,
  GetExpeditionShoesRepoOutput,
  getShoesPaginated,
  GetShoeBySvcOutput,
  GetItemShoesPaginatedRepoOutput,
  GetExpeditionShoesSvcOutput,
  getShoeBy,
  Accumulator,
  getExpeditionShoes,
  getShoesGroupedBySizePaginated,
  getShoesGroupedByItemSizePaginatedRespose,
};
