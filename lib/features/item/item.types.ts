import { ItemEntity } from "../../prisma/prisma.entity";

type GetShoeSvcInput = {
  id?: number;
  sku?: string;
  size?: number;
  price?: number;
};

type CreateShoeSvcInput = {
  sku: string;
  size: number;
  price: number;
  shoeId: number;
};

type UpdateShoeSvcInput = {
  id: number;
  sku: string;
  size: number;
  price: number;
  shoeId: number;
};

type DebitItemsSvcInput = {
  skus: string[];
  userId: number;
  companyId: number;
};

type CreateItemsSvcInput = {
  userId: number;
  skus: string[];
};

type CreateShoeRepoInput = {
  sku: string;
  size: number;
  price: number;
  shoeId: number;
};

type UpdateShoeRepoInput = {
  id: number;
  sku: string;
  size: number;
  price: number;
  shoeId: number;
};

type GetShoePaginatedRepoInput = {
  skip: number;
  take: number;
};

type GetShoeRepoInput = {
  id?: number;
  sku?: string;
  size?: number;
  price?: number;
};

type DebitItemsRepoInput = {
  skus: string[];
  userId: number;
  companyId: number;
};

type CreateItemsRepoInput = {
  userId: number;
  skus: string[];
};

type GetItemBySvcOutput = Promise<ItemEntity>;

export type { GetShoeSvcInput, CreateShoeSvcInput, UpdateShoeSvcInput, DebitItemsSvcInput, CreateItemsSvcInput, CreateItemsRepoInput, UpdateShoeRepoInput, GetItemBySvcOutput, GetShoePaginatedRepoInput, GetShoeRepoInput, DebitItemsRepoInput, CreateShoeRepoInput };
