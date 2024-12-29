type GetShoesGroupedByCategoryPaginated = {
  page: number;
  size: number;
};

type GetShoesGroupedByCategoryPaginatedRespose = {
  meta: {
    skip: number;
    take: number;
    total: number;
  };
  categories: {
    id: number;
    name: string;
    sole: string;
    note: string;
    color: string;
    createdAt: string;
    deletedAt: string | null;
    groupedShoes: {
      size: number;
      shoes: {
        id: number;
        price: number;
      }[];
    }[];
  }[];
};

type GetCategoryByIdResponse = {
  id: number;
  name: string;
  sole: string;
  color: string;
  note: string;
  createdAt: string;
  deletedAt: string | null;
  shoes: {
    id: number;
    sku: string;
    size: number;
    price: number;
    createdAt: string;
    deletedAt: string | null;
  }[];
};

type UpdateCategory = {
  id: number;
  name: string;
  sole: string;
  note: string;
  color: string;
};

type CreateCategory = {
  name: string;
  sole: string;
  note: string;
  color: string;
};

export type {
  GetShoesGroupedByCategoryPaginatedRespose,
  GetShoesGroupedByCategoryPaginated,
  GetCategoryByIdResponse,
  UpdateCategory,
  CreateCategory,
};
