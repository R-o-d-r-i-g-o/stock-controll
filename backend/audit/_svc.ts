import * as repo from "./_repo";
import * as t from "./_types.svc";

const createAudit = async (audit: t.createHistoryProps) => {
  const auditId = await repo.createAudit(audit);
  return auditId;
};

const getAuditsPaginated = async (filter: t.getAuditsPaginatedProps) => {
  const parsedFilter = {
    skip: (filter.page - 1) * filter.size,
    take: filter.size,
  };

  const auditCount = await repo.getAuditsCount(parsedFilter);
  const auditList = await repo.getAuditsPaginated(parsedFilter);

  return {
    meta: {
      ...filter,
      total: auditCount,
    },
    audits: auditList.map((a) => ({
      id: a.id,
      note: a.note,
      user: a.User.name,
      shoeId: a.item_id,
      createdAt: a.created_at,
    })),
  };
};

export { getAuditsPaginated, createAudit };
