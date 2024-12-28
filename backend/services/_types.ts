type getAuthUserProps = {
  email: string;
  password: string;
}

type getAuthUserResponse = {
  id: number;
  name: string;
  email: string;
}

type createUserProps = {
  name: string;
  email: string;
  role_id: number;
  password: string;
}

type updateUserProps = {
  id: number;
  name: string;
  email: string;
  role_id: number;
  password: string;
}

type getUsersPaginatedProps = {
  page: number;
  size: number;
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

type createShoeProps = {
  id: number;
  size: number;
  price: number;
  hash_code: string;
  category_id: number;
}

type createHistoryProps = {
  note: string
  user_id: number
  shoe_id?: number
}

type getCategoryByProps = {
  id?: number
  name?: string;
}

type getAuditsPaginatedProps = {
  page: number;
  size: number;
}

type getShoesGroupedByCategoryPaginatedProps = {
  page: number;
  size: number;
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


type Accumulator = {
  [size: number]: { size: number; shoes: { id: number; price: number }[] };
};

export type {
  updateCategoryProps,
  getAuthUserProps,
  getAuthUserResponse,
  updateUserProps,
  createCategoryProps,
  createShoeProps,
  createUserProps,
  getCategoryByProps,
  getUsersPaginatedProps,
  getShoeByProps,
  getAuditsPaginatedProps,
  getShoesGroupedByCategoryPaginatedProps,
  createHistoryProps,
  Accumulator,
  getUserProps,
};