type CreateTag = {
  sku: string;
  shoeId: number;
  userId: number;
  companyId: number;
  metadata: { [key: string]: object };
};

type UpdateTag = {
  id: number;
  sku?: string;
  shoeId?: number;
  userId?: number;
  metadata?: { [key: string]: object };
};

type DeleteTag = {
  tagId: number;
  shoeId: number;
};

type GetTagBy = {
  id?: number;
  sku?: string;
  shoeId?: number;
};

export type { CreateTag, UpdateTag, DeleteTag, GetTagBy };
