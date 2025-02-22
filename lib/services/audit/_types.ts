type GetAuditsPaginated = {
  page: number;
  size: number;
};

type GetAuditsPaginatedResponse = {
  meta: {
    skip: number;
    take: number;
    total: number;
  };
  audits: Array<{
    id: number;
    user: string;
    note: string;
    shoeId: number;
    createdAt: string;
  }>;
};

export type { GetAuditsPaginated, GetAuditsPaginatedResponse };
