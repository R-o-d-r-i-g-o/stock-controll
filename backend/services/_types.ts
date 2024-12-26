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

export type {
  getAuthUserProps,
  getAuthUserResponse,
  updateUserProps,
  createUserProps,
  getUsersPaginatedProps,
  getUserProps,
};