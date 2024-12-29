type getCategoryByProps = {
  id?: number;
  name?: string;
};

type getShoesGroupedByCategoryPaginatedProps = {
  page: number;
  size: number;
};

type createCategoryProps = {
  color: string;
  sole: string;
  name: string;
  note: string;
};

type updateCategoryProps = {
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
  updateCategoryProps,
  createCategoryProps,
  getCategoryByProps,
  Accumulator,
  getShoesGroupedByCategoryPaginatedProps,
};
