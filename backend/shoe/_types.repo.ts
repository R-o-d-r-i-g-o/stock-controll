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

type getCategoryByProps = {
  id?: number;
  name?: string;
};

type getShoesPaginatedProps = {
  skip: number;
  take: number;
};

export type {
  createCategoryProps,
  updateCategoryProps,
  getCategoryByProps,
  getShoesPaginatedProps,
};
