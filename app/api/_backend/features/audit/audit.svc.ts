import repo from "./audit.repo";
import * as t from "./audit.types";

type AuditService = {
  createAuditRecord(input: t.CreateAuditSvcInput): t.CreateAuditRecordSvcOutput;

  getAuditsPaginated(
    input: t.GetAuditsPaginatedSvcInput
  ): t.GetAuditsPaginatedSvcOutput;
};

const auditService = {} as AuditService;

auditService.createAuditRecord = async (audit: t.CreateAuditSvcInput) => {
  const auditId = await repo.createAuditRecord(audit);
  return auditId;
};

auditService.getAuditsPaginated = async (filter) => {
  const parsedFilter = {
    skip: (filter.page - 1) * filter.size,
    take: filter.size,
  };

  const [auditCount, auditList] = await Promise.all([
    repo.getAuditsCount(parsedFilter),
    repo.getAuditsPaginated(parsedFilter),
  ]);

  return {
    meta: {
      ...filter,
      total: auditCount,
    },
    audits: auditList.map((a) => ({
      id: a.id,
      note: a.note,
      user: a.User!.name,
      shoeId: a.itemId!,
      createdAt: a.createdAt,
    })),
  };
};

export default auditService;
