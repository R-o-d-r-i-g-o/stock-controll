type TableProps = {
  meta: {
    categoryId: number;
  };
  data: {
    id: number;
    sku: string;
    size: number;
    price: number;
    createdAt: string;
    deletedAt: string | null;
  }[];
};

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
  };
};

type InitialStateEntries = {
  message: string;
  fieldValues: CreateUserFormEntries;
};

type CreateUserFormEntries = {
  id: string;
  name: string;
  sole: string;
  color: string;
  note: string;
};

export type {
  InitialStateEntries,
  CreateUserFormEntries,
  TableProps,
  DashProps,
};
