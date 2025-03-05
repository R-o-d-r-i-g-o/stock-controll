type getAuthUserProps = {
  email: string;
  password: string;
};

type getAuthUserResponse = {
  id: number;
  name: string;
  email: string;
};

type createUserProps = {
  name: string;
  email: string;
  roleId: number;
  password: string;
};

type updateUserProps = {
  id: number;
  name: string;
  email: string;
  roleId: number;
  password: string;
};

type getUsersPaginatedProps = {
  page: number;
  size: number;
};

type getUserProps = {
  id?: number;
  name?: string;
  email?: string;
};

export type {
  getUsersPaginatedProps,
  getAuthUserResponse,
  getAuthUserProps,
  updateUserProps,
  createUserProps,
  getUserProps,
};
