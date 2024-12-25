import { cachedApi, api } from './_api'
import * as t from './_types'

const fetchUsersPaginated = async () => {
  const res = await cachedApi.get<t.GetUsersPaginatedResponse>("/api/users", {
    params: {
      page: 1,
      size: 10,
    }
  });
  return res.data;
};

const getRolesList = async () => {
  const res = await cachedApi.get<t.GetRolesListResponse>("/api/users/roles")
  return res.data
}

const createNewUser = async (req: t.CreateNewUser) => {
  const res = await api.post<t.CreateNewUserResponse>("/api/users", req)
  return res.data
}

export {
  fetchUsersPaginated,
  getRolesList,
  createNewUser,
};