type createUser = {
  name: string;
  email: string;
  roleId: number;
  password: string;
};

type updateUser = {
  id: number;
  name: string;
  email: string;
  roleId: number;
  password: string;
};

type getUsersPaginated = {
  skip: number;
  take: number;
};

type getUser = {
  id?: number;
  name?: string;
  email?: string;
};

export type { getUsersPaginated, updateUser, createUser, getUser };
