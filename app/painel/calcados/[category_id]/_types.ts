type TableProps = {
  data: {
    id: number;
    sku: string;
    size: number;
    price: number;
    createdAt: string;
    deletedAt: string | null;
  }[];
}

type DashProps = {
  data: {
    id: number;
    name: string;
    sole: string;
    color: string;
    note: string;
    createdAt: string;
    deletedAt: string | null;
    shoes: {
      id: number;
      sku: string;
      size: number;
      price: number;
      createdAt: string;
      deletedAt: string | null;
    }[];
  }
}

export type { TableProps, DashProps };