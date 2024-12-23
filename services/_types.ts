import { StorageValue } from 'axios-cache-interceptor';

type HealthCheckResponse = {
  version: string;
  message: string;
  database: boolean;
  last_build: string;
}

type CacheStorage = {
  [key: string]: StorageValue;
}

export type {
  HealthCheckResponse,
  CacheStorage,
}