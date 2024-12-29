type createShoeProps = {
  sku: string;
  size: number;
  price: number;
  shoeId: number;
};

type updateShoeProps = {
  id: number;
  sku: string;
  size: number;
  price: number;
  shoeId: number;
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
