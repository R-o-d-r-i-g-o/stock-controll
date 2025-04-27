type GetItemsGroupedByShoePaginated = {
  page: number;
  size: number;
};

type getShoesGroupedByItemSizePaginatedRespose = {
  meta: {
    skip: number;
    take: number;
    total: number;
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

type GetShoeByIdResponse = {
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
};

type Updateshoe = {
  id: number;
  name: string;
  sole: string;
  note: string;
  color: string;
};

type CreateShoe = {
  name: string;
  sole: string;
  note: string;
  color: string;
};

export type { getShoesGroupedByItemSizePaginatedRespose, GetItemsGroupedByShoePaginated, GetShoeByIdResponse, Updateshoe, CreateShoe };
