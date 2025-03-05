type createHistoryProps = {
  note: string;
  userId: number;
  shoeId?: number;
};

type getAuditsPaginatedProps = {
  skip: number;
  take: number;
};

export type { createHistoryProps, getAuditsPaginatedProps };
