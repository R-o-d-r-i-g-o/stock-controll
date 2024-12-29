type createShoeProps = {
  sku: string;
  size: number;
  price: number;
  categoryId: number;
};

type updateShoeProps = {
  id: number;
  sku: string;
  size: number;
  price: number;
  categoryId: number;
};

type getShoesPaginatedProps = {
  skip: number;
  take: number;
};
type getShoeByProps = {
  id?: number;
  sku?: string;
  size?: number;
  price?: number;
};

export type {
  getShoesPaginatedProps,
  createShoeProps,
  updateShoeProps,
  getShoeByProps,
};
