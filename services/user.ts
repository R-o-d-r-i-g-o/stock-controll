import { cachedApi } from './_api'
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

const createNewUser = () => {

}

export { fetchUsersPaginated, createNewUser };