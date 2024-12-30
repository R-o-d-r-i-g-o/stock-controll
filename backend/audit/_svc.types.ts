type createHistoryProps = {
  note: string;
  userId: number;
  shoeId?: number;
};

type getAuditsPaginatedProps = {
  page: number;
  size: number;
};

export type { getAuditsPaginatedProps, createHistoryProps };
