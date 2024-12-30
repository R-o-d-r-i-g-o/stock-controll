type GetRolesListResponse = {
  meta: {
    total: number;
  };
  roles: Array<{
    id: number;
    name: string;
  }>;
};

type GetUsersPaginated = {
  page: number;
  size: number;
};

type GetUsersPaginatedResponse = {
  meta: {
    skip: number;
    take: number;
    total: number;
  };
  users: Array<{
    id: number;
    name: string;
    role: string;
    email: string;
    createdAt: string;
    deletedAt: string | null;
  }>;
};

type GetUserByIdResponse = {
  id: number;
  name: string;
  email: string;
  roleId: number;
  createdAt: string;
  deletedAt: string | null;
};

type CreateNewUser = {
  name: string;
  email: string;
  roleId: number;
  password: string;
};

type UpdateUser = {
  id: number;
  name?: string;
  email?: string;
  roleId?: number;
  password?: string;
};

type CreateNewUserResponse = {
  userId: number;
};

export type {
  GetUsersPaginatedResponse,
  CreateNewUserResponse,
  GetRolesListResponse,
  GetUserByIdResponse,
  GetUsersPaginated,
  CreateNewUser,
  UpdateUser,
};
