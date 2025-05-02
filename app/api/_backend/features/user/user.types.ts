import { UserEntity, RoleEntity } from "../../prisma/prisma.entity";

type getAuthUserProps = {
  email: string;
  password: string;
};

type GetAuthUserSvcOutput = Promise<{
  id: number;
  name: string;
  email: string;
}>;

type createUserProps = {
  name: string;
  email: string;
  roleId: number;
  password: string;
  companyId: number;
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
  companyId?: number;
};

type createUser = {
  name: string;
  email: string;
  roleId: number;
  password: string;
  companyId: number;
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

type GetUsersPaginatedRepoOutput = Promise<
  (UserEntity & {
    Role: RoleEntity;
  })[]
>;

type GetUsersPaginatedSvcOutput = Promise<{
  meta: {
    total: number;
    page: number;
    size: number;
  };
  users: {
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
    deletedAt: Date | null;
  }[];
}>;

type GetRolesSvcOutput = Promise<{
  meta: {
    total: number;
  };
  roles: {
    id: number;
    name: string;
  }[];
}>;

type GetUserBySvcOutput = Promise<Omit<UserEntity, "password">>;

type GetUserByRepoOutput = Promise<UserEntity>;

type DeleteUserRepoOutput = Promise<UserEntity>;

type GetRolesListRepoOutput = Promise<RoleEntity[]>;

export type {
  getUsersPaginatedProps,
  GetAuthUserSvcOutput,
  getAuthUserProps,
  updateUserProps,
  createUserProps,
  getUserProps,
  DeleteUserRepoOutput,
  getUsersPaginated,
  GetUserByRepoOutput,
  GetRolesListRepoOutput,
  GetUsersPaginatedRepoOutput,
  GetUserBySvcOutput,
  GetUsersPaginatedSvcOutput,
  GetRolesSvcOutput,
  updateUser,
  createUser,
  getUser,
};
