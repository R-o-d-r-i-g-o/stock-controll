import { cachedApi, api, CacheCustomKeys } from './_api'
import * as t from './_types'

const fetchUsersPaginated = async (req: t.GetUsersPaginated) => {
  const res = await cachedApi.get<t.GetUsersPaginatedResponse>("/api/users", {
    id: CacheCustomKeys.listPaginatedUsers,
    params: req
  });
  return res.data;
};

const getRolesList = async () => {
  const res = await cachedApi.get<t.GetRolesListResponse>("/api/users/roles")
  return res.data
}

const createNewUser = async (req: t.CreateNewUser) => {
  const res = await api.post<t.CreateNewUserResponse>("/api/users", req)
  cachedApi.storage.remove(CacheCustomKeys.listPaginatedUsers)

  return res.data
}

export {
  fetchUsersPaginated,
  getRolesList,
  createNewUser,
};