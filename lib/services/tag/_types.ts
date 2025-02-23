type GetShoeRelatedTags = {
  shoeId: number;
};

type GetShoeRelatedTagsReponse = {
  meta: {
    shoeId: number;
    total: number;
  };
  tags: {
    id: number;
    sku: string;
    shoeId: number;
    userId: number;
    metadata: { [key: string]: object };
    createdAt: Date;
    deletedAt: Date | null;
  }[];
};

type GetShoeRelatedTag = {
  tagId: number;
  shoeId: number;
};

type GetShoeRelatedTagReponse = {
  sku: string;
  shoeId: number;
  metadata: { [key: string]: object };
  id: number;
  userId: number;
  createdAt: Date;
  deletedAt: Date | null;
};

type CreateShoeRelatedTag = {
  shoeId: number;
  payload: {
    sku: string;
    metadata: { [key: string]: object };
  };
};

type CreateShoeRelatedTagReponse = {
  tagId: number;
};

export type {
  GetShoeRelatedTags,
  GetShoeRelatedTag,
  CreateShoeRelatedTag,
  GetShoeRelatedTagsReponse,
  GetShoeRelatedTagReponse,
  CreateShoeRelatedTagReponse,
};
