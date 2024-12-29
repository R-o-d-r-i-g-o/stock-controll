type GetShoesById = {
  id: number;
  sku: string;
  size: number;
  price: string;
  categoryId: number;
  createdAt: string;
  deletedAt: string | null;
};

type CreateShoe = {
  sku: string;
  size: number;
  price: number;
  categoryId: number;
};

type UpdateShoe = {
  id: number;
  sku: string;
  size: number;
  price: number;
  categoryId: number;
};

export type { GetShoesById, CreateShoe, UpdateShoe };
