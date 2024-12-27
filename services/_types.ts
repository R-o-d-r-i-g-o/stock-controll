import { StorageValue } from 'axios-cache-interceptor';

type HealthCheckResponse = {
  version: string;
  message: string;
  database: boolean;
  last_build: string;
}

type GetRolesListResponse = {
  meta: {
    total: number;
  };
  roles: Array<{
    id: number;
    name: string;
  }>
}

type GetUsersPaginated = {
  page: number;
  size: number;
}

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
}

type GetAuditsPaginated = {
  page: number;
  size: number;
}

type GetAuditsPaginatedResponse = {
  meta: {
    skip: number;
    take: number;
    total: number;
  };
  audits: Array<{
    id: number;
    user: string;
    note: string;
    shoeId: number;
    createdAt: string;
  }>;
}

type GetShoesGroupedByCategoryPaginated = {
  page: number;
  size: number;
}

type GetShoesGroupedByCategoryPaginatedRespose = {
  meta: {
    skip: number;
    take: number;
    total: number;
  };
  categories: {
    id: number;
    name: string;
    sole: string;
    note: string;
    color: string;
    createdAt: string;
    deletedAt: string | null;
    groupedShoes: {
      size: number;
      shoes: {
        id: number;
        price: number;
      }[];
    }[];
  }[];
}

type GetUserByIdResponse = {
  id: number;
  name: string;
  email: string;
  role_id: number;
  createdAt: string;
  deletedAt: string | null;
}

type GetCategoryByIdResponse = {
  id: number;
  name: string;
  sole: string;
  color: string;
  note: string;
  createdAt: string;
  deletedAt: string | null;
  shoes: {
    id: number;
    sku: string;
    size: number;
    price: number;
    createdAt: string;
    deletedAt: string | null;
  }[];
}

type CreateNewUser = {
  name: string
  email: string
  role_id: number
  password: string
}

type UpdateUser = {
  id: number
  name?: string
  email?: string
  role_id?: number
  password?: string
}

type CreateNewUserResponse = {
  user_id: number
}

type CacheStorage = {
  [key: string]: StorageValue;
}

export type {
  UpdateUser,
  HealthCheckResponse,
  GetRolesListResponse,
  CreateNewUserResponse,
  GetAuditsPaginatedResponse,
  GetUsersPaginatedResponse,
  GetShoesGroupedByCategoryPaginated,
  GetShoesGroupedByCategoryPaginatedRespose,
  GetCategoryByIdResponse,
  GetUserByIdResponse,
  GetAuditsPaginated,
  GetUsersPaginated,
  CreateNewUser,
  CacheStorage,
}