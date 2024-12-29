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
  categoryId: number;
};

type updateShoeProps = {
  id: number;
  sku: string;
  size: number;
  price: number;
  categoryId: number;
};

export type { createShoeProps, updateShoeProps, getShoeByProps };
