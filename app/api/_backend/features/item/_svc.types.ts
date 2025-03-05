type getShoeByProps = {
  id?: number;
  sku?: string;
  size?: number;
  price?: number;
};

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

type debitItemsProps = {
  userId: number;
  skus: string[];
};

type createItemsProps = {
  userId: number;
  skus: string[];
};

export type {
  createShoeProps,
  updateShoeProps,
  debitItemsProps,
  createItemsProps,
  getShoeByProps,
};
