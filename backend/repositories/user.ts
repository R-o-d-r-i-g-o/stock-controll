import { prisma, prismaTransaction } from './_prisma'
import * as t from './_types'

const createUser = async (user: t.createUserProps) => {
  return await prismaTransaction(async () => {
    const { id } = await prisma.user.create({ data: user })
    return id
  })
}

const getUserByEmail = async (email: string) => {
  return await prisma.user.findFirstOrThrow({ where: { email } })
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

export {
  createUser,
  getUserByEmail,
  getusersCount,
  getUsersPaginated,
};