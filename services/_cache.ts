import * as t from './_types';

import { setupCache, buildStorage } from 'axios-cache-interceptor';

// TODO: When application grows, integrate redis or firebase this case.
// Do not use native next-cache for this purpose.

// Define the cache storage object
const cacheStorage: t.CacheStorage = {};

// Define the cache operation methods
const cacheOperations = buildStorage({
  set: async (key, value) => {
    cacheStorage[key] = value;
  },
  find: async (key) => {
    return cacheStorage[key]
  },
  remove: async (key) => {
    delete cacheStorage[key];
  },
});

enum CacheCustomKeys {
  listUsersRoles = "list-users-roles",
  listPaginatedUsers = "list-paginated-users"
}

export {
  setupCache,
  cacheOperations,
  CacheCustomKeys,
};