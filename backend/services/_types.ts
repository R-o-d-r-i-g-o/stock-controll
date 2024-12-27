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

type createHistoryProps = {
  note: string
  user_id: number
  shoe_id?: number
}

type getAuditsPaginatedProps = {
  page: number;
  size: number;
}

type getShoesGroupedByCategoryPaginatedProps = {
  page: number;
  size: number;
}

type Accumulator = {
  [size: number]: { size: number; shoes: { id: number; price: number }[] };
};

export type {
  getAuthUserProps,
  getAuthUserResponse,
  updateUserProps,
  createUserProps,
  getUsersPaginatedProps,
  getAuditsPaginatedProps,
  getShoesGroupedByCategoryPaginatedProps,
  createHistoryProps,
  Accumulator,
  getUserProps,
};