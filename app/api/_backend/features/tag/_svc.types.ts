type CreateTag = {
  sku: string;
  shoeId: number;
  userId: number;
  metadata: { [key: string]: object };
};

type UpdateTag = {
  id: number;
  sku?: string;
  shoeId?: number;
  userId?: number;
  metadata?: { [key: string]: object };
};

type GetTagBy = {
  id?: number;
  sku?: string;
  shoeId?: number;
};

export type { CreateTag, UpdateTag, GetTagBy };
