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

type getCategoryByProps = {
  id?: number
  name?: string;
}

type getUserProps = {
  id?: number;
  name?: string;
  email?: string;
}

export type {
  updateUserProps,
  createUserProps,
  createHistoryProps,
  getCategoryByProps,
  getShoesPaginatedProps,
  getUsersPaginatedProps,
  getAuditsPaginatedProps,
  getUserProps,
}