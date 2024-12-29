type createHistoryProps = {
  note: string;
  user_id: number;
  shoe_id?: number;
};

type getAuditsPaginatedProps = {
  skip: number;
  take: number;
};

export type { createHistoryProps, getAuditsPaginatedProps };
