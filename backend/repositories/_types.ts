type createUserProps = {
  name: string;
  email: string;
  role_id: number;
  password: string;
}

type createHistoryProps = {
  note: string
  user_id: number
  shoe_id?: number
}

type createShoeProps = {
  sku: string;
  size: number;
  price: number;
  categoryId: number;
}

type updateShoeProps = {
  id: number;
  sku: string;
  size: number;
  price: number;
  categoryId: number;
}

type updateUserProps = {
  id: number;
  name: string;
  email: string;
  role_id: number;
  password: string;
}

type getUsersPaginatedProps = {
  skip: number;
  take: number;
}

type getAuditsPaginatedProps = {
  skip: number;
  take: number;
}

type getShoesPaginatedProps = {
  skip: number;
  take: number;
}

type createCategoryProps = {
  color: string;
  sole: string;
  name: string;
  note: string;
}

type updateCategoryProps = {
  id: number;
  color?: string;
  sole?: string;
  name?: string;
  note?: string;
}

type getCategoryByProps = {
  id?: number
  name?: string;
}

type getUserProps = {
  id?: number;
  name?: string;
  email?: string;
}

type getShoeByProps = {
  id?: number;
  sku?: string;
  size?: number;
  price?: number;
}

export type {
  updateUserProps,
  createUserProps,
  createShoeProps,
  getShoeByProps,
  createCategoryProps,
  createHistoryProps,
  getCategoryByProps,
  getShoesPaginatedProps,
  getUsersPaginatedProps,
  getAuditsPaginatedProps,
  getUserProps,
  updateShoeProps,
  updateCategoryProps,
}