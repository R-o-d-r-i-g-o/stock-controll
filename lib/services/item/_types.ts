type GetShoesById = {
  id: number;
  sku: string;
  size: number;
  price: number;
  shoeId: number;
  createdAt: string;
  deletedAt: string | null;
};

type CreateShoe = {
  sku: string;
  size: number;
  price: number;
  shoeId: number;
};

type UpdateShoe = {
  id: number;
  sku: string;
  size: number;
  price: number;
  shoeId: number;
};

export type {
  GetShoesById as GetItemById,
  CreateShoe as CreateItem,
  UpdateShoe as UpdateItem,
};
