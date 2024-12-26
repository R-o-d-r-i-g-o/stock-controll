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

type GetUserByIdResponse = {
  id: number;
  name: string;
  role: string;
  email: string;
  createdAt: string;
  deletedAt: string | null;
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
  GetUsersPaginatedResponse,
  GetUserByIdResponse,
  GetUsersPaginated,
  CreateNewUser,
  CacheStorage,
}