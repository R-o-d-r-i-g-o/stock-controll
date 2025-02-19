type TableProps = {
  meta: {
    page: number;
    size: number;
    shoeId: number;
  };
  data: {
    id: number;
    sku: string;
    user: number;
    metadata: number;
    createdAt: string;
    deletedAt: string | null;
  }[];
};

export type { TableProps };
