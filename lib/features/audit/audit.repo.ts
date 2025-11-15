import { prisma, prismaTransaction } from "../../prisma/prisma.client";
import moment from "moment";
import * as t from "./audit.types";

type AuditRepository = {
  createAuditRecord(input: t.CreateAuditRecordRepoInput): t.CreateAuditRecordRepoOutput;
  getAuditsCount(input: t.GetAuditsPaginatedRepoInput): t.GetAuditsCountRepoOutput;
  getAuditsPaginated(input: t.GetAuditsPaginatedRepoInput): t.GetAuditsPaginatedRepoOutput;
  getAuditsByDate(input: t.GetAuditsByDateInput): Promise<t.GetAuditsByDateOutput>;
};

const auditRepository = {} as AuditRepository;

auditRepository.createAuditRecord = async (audit) => {
  return await prismaTransaction(async () => {
    const { id } = await prisma.audit.create({ data: audit });
    return id;
  });
};

auditRepository.getAuditsCount = async (filter) => {
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

auditRepository.getAuditsByDate = async (input) => {
  const formatDate = (date: Date) => moment(date).format("YYYY-MM-DD");

  const result = await prisma.$queryRaw<Array<{ date: string; count: bigint }>>`
    SELECT DATE(a.created_at)   AS date,
           COUNT(1)::int        AS count
      FROM "public"."tb_audits" AS a
     WHERE a.company_id  = ${input.companyId}
       AND a.created_at >= CAST(${formatDate(input.startDate)} AS DATE)
     GROUP BY DATE(a.created_at)
     ORDER BY DATE(a.created_at) ASC
  `;

  return result.map((row) => ({
    date: row.date,
    count: Number(row.count),
  }));
};

export default auditRepository;
