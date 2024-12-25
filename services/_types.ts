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

type CreateNewUser = {
  name: string
  email: string
  role_id: number
  password: string
}

type CreateNewUserResponse = {
  user_id: number
}

type CacheStorage = {
  [key: string]: StorageValue;
}

export type {
  HealthCheckResponse,
  GetRolesListResponse,
  CreateNewUserResponse,
  GetUsersPaginatedResponse,
  CreateNewUser,
  CacheStorage,
}