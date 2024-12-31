type createHistoryProps = {
  note: string;
  userId: number;
  itemId?: number;
};

type getAuditsPaginatedProps = {
  page: number;
  size: number;
};

export type { getAuditsPaginatedProps, createHistoryProps };
