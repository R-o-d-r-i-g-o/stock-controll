import { prisma, prismaTransaction } from "../../prisma";
import * as t from "./_repo.types";

const createAudit = async (audit: t.createHistoryProps) => {
  return await prismaTransaction(async () => {
    const { id } = await prisma.audit.create({ data: audit });
    return id;
  });
};

const getAuditsCount = async (filter: t.getAuditsPaginatedProps) => {
  console.log("filter", filter);
  return await prisma.audit.count();
};

const getAuditsPaginated = async (filter: t.getAuditsPaginatedProps) => {
  return await prisma.audit.findMany({
    take: filter.take,
    skip: filter.skip,
    include: {
      User: true,
      Item: true,
    },
  });
};

export { getAuditsPaginated, getAuditsCount, createAudit };
