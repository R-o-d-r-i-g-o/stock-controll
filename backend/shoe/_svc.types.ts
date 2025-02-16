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
    createdAt: Date;
    deletedAt: Date | null;
    groupedItems: {
      size: number;
      items: {
        id: number;
        price: number;
      }[];
    }[];
  }[];
};

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
};

type updateShoe = {
  id: number;
  color?: string;
  sole?: string;
  name?: string;
  note?: string;
};

type Accumulator = {
  [size: number]: { size: number; items: { id: number; price: number }[] };
};

export type {
  updateShoe,
  createShoe,
  getShoeBy,
  Accumulator,
  getShoesGroupedBySizePaginated,
  getShoesGroupedByItemSizePaginatedRespose,
};
