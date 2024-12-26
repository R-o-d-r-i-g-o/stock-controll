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

const getUserById = async (id: number) => {
  const res = await cachedApi.get<t.GetUserByIdResponse>(`/api/users/${id}`);
  return res.data;
}

const createUser = async (req: t.CreateNewUser) => {
  const res = await api.post<t.CreateNewUserResponse>("/api/users", req)

  await cachedApi.storage.remove(CacheCustomKeys.listPaginatedUsers)
  return res.data
}

const updateUser = async (req: t.UpdateUser) => {
  await api.put<null>(`/api/users/${req.id}`, {
    name: req.name,
    email: req.email,
    role_id: req.role_id,
    Password: req.password,
  })
  await cachedApi.storage.remove(CacheCustomKeys.listPaginatedUsers)
}

const deleteUser = async (id: number) => {
  await api.delete(`/api/users/${id}`)
  await cachedApi.storage.remove(CacheCustomKeys.listPaginatedUsers)
}

export {
  fetchUsersPaginated,
  getUserById,
  getRolesList,
  createUser,
  updateUser,
  deleteUser,
};