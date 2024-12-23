import * as repo from '@/backend/repositories'
import * as h from '@/backend/helpers'

import * as t from './_types'

const { comparePasswords, encryptPassword } = h.hashHelper()

const getAuthUser = async (filter: t.getAuthUserProps): Promise<t.getAuthUserResponse> => {
  const { email, password } = filter;

  const user = await repo.getUserByEmail(email);
  if (!user)
    throw new Error("Usuário não encontrado");

  const passwordMatch = await comparePasswords(password, user.password);
  if (!passwordMatch)
    throw new Error("Não autorizado");

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

const getUsersPaginated = async (filter: t.getUsersPaginatedProps) => {
  const parsedFilter = {
    skip: (filter.page - 1) * filter.size,
    take: filter.size
  }

  const userCount = await repo.getusersCount(parsedFilter)
  const userList = await repo.getUsersPaginated(parsedFilter)

  return {
    meta: {
      ...filter,
      total: userCount
    },
    users: userList.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      createdAt: u.created_at,
      deletedAt: u.deleted_at,
      role: u.role.name,
    }))
  }
}

const createUser = async (user: t.createUserProps) => {
  user.password = await encryptPassword(user.password)
  return await repo.createUser(user)
}

export {
  createUser,
  getAuthUser,
  getUsersPaginated,
}