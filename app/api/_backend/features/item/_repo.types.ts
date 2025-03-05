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

type debitItemsProps = {
  userId: number;
  skus: string[];
};

type createItemsProps = {
  userId: number;
  skus: string[];
};

export type {
  getShoesPaginatedProps,
  createItemsProps,
  debitItemsProps,
  createShoeProps,
  updateShoeProps,
  getShoeByProps,
};
