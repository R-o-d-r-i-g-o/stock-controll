type getShoeBy = {
  id?: number;
  name?: string;
};

type getShoesGroupedBySizePaginated = {
  page: number;
  size: number;
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
  [size: number]: { size: number; shoes: { id: number; price: number }[] };
};

export type {
  updateShoe,
  createShoe,
  getShoeBy,
  Accumulator,
  getShoesGroupedBySizePaginated,
};
