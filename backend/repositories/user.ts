import moment from 'moment'
import { prisma, prismaTransaction } from './_prisma'
import * as t from './_types'

const createUser = async (user: t.createUserProps) => {
  return await prismaTransaction(async () => {
    const { id } = await prisma.user.create({ data: user })
    return id
  })
}

const updateUser = async (user: t.updateUserProps) => {
  return await prismaTransaction(async () => {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name || undefined,
        email: user.email || undefined,
        role_id: user.role_id || undefined,
        password: user.password || undefined,
      }
    })
  })
}

const deleteUser = async (id: number) => {
  return await prismaTransaction(async () => {
    const userdeleted = await prisma.user.update({
      where: { id },
      data: { deleted_at: moment.utc().toDate() }
    })
    return userdeleted
  })
}

const getUserBy = async (filter: t.getUserProps) => {
  return await prisma.user.findFirstOrThrow({ where: { ...filter } })
}

const getusersCount = async (filter: t.getUsersPaginatedProps) => {
  console.log("filter", filter)
  return await prisma.user.count()
}

const getUsersPaginated = async (filter: t.getUsersPaginatedProps) => {
  return await prisma.user.findMany({
    take: filter.take,
    skip: filter.skip,
    include: { role: true },
  })
}

const getRolesList = async () => {
  return await prisma.role.findMany()
}

export {
  updateUser,
  createUser,
  deleteUser,
  getUserBy,
  getusersCount,
  getUsersPaginated,
  getRolesList,
};