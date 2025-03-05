import { UserEntity, RoleEntity } from "../../prisma/prisma.entity";

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

type GetUsersPaginatedRepoOutput = Promise<
  (UserEntity & {
    Role: RoleEntity;
  })[]
>;

type GetUserByRepoOutput = Promise<UserEntity>;

type DeleteUserRepoOutput = Promise<UserEntity>;

type GetRolesListRepoOutput = Promise<RoleEntity[]>;

export type {
  getUsersPaginatedProps,
  getAuthUserResponse,
  getAuthUserProps,
  updateUserProps,
  createUserProps,
  getUserProps,
  DeleteUserRepoOutput,
  getUsersPaginated,
  GetUserByRepoOutput,
  GetRolesListRepoOutput,
  GetUsersPaginatedRepoOutput,
  updateUser,
  createUser,
  getUser,
};
