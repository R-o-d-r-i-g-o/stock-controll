import { prisma, prismaTransaction } from './_prisma'
import * as t from './_types'

const createAudit = async (audit: t.createHistoryProps) => {
  return await prismaTransaction(async () => {
    const { id } = await prisma.history.create({ data: audit })
    return id
  })
}

const getAuditsCount = async (filter: t.getAuditsPaginatedProps) => {
  console.log("filter", filter)
  return await prisma.history.count()
}

const getAuditsPaginated = async (filter: t.getAuditsPaginatedProps) => {
  return await prisma.history.findMany({
    take: filter.take,
    skip: filter.skip,
    include: {
      user: true,
      shoe: true,
    },
  })
}

export {
  getAuditsPaginated,
  getAuditsCount,
  createAudit
}