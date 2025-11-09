import { prisma, prismaTransaction } from "../../prisma/prisma.client";
import * as t from "./audit.types";

type AuditRepository = {
  createAuditRecord(input: t.CreateAuditRecordRepoInput): t.CreateAuditRecordRepoOutput;

  getAuditsCount(input: t.GetAuditsPaginatedRepoInput): t.GetAuditsCountRepoOutput;

  getAuditsPaginated(input: t.GetAuditsPaginatedRepoInput): t.GetAuditsPaginatedRepoOutput;
};

const auditRepository = {} as AuditRepository;

auditRepository.createAuditRecord = async (audit) => {
  return await prismaTransaction(async () => {
    const { id } = await prisma.audit.create({ data: audit });
    return id;
  });
};

auditRepository.getAuditsCount = async (filter) => {
  console.log("filter", filter);
  return await prisma.audit.count();
};

auditRepository.getAuditsPaginated = async (filter) => {
  return await prisma.audit.findMany({
    take: filter.take,
    skip: filter.skip,
    include: {
      User: true,
      Item: true,
    },
  });
};

export default auditRepository;
