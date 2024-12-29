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

export type { createShoeProps, updateShoeProps, getShoeByProps };
