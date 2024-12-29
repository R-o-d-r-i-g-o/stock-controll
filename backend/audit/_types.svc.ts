type createHistoryProps = {
  note: string;
  user_id: number;
  shoe_id?: number;
};

type getAuditsPaginatedProps = {
  page: number;
  size: number;
};

export type { getAuditsPaginatedProps, createHistoryProps };
