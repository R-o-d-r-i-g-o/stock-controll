type TableProps = {
  meta: {
    total: number;
    shoeId: number;
  };
  data: {
    id: number;
    sku: string;
    shoeId: number;
    userId: number;
    metadata: { [key: string]: object };
    createdAt: Date;
    deletedAt: Date | null;
  }[];
};

export type { TableProps };
