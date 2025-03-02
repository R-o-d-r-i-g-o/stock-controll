type DashProps = {
  data: {
    id: number;
    name: string;
    sole: string;
    color: string;
    note: string;
    createdAt: string;
    deletedAt: string | null;
    items: {
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

export type { InitialStateEntries, CreateUserFormEntries, DashProps };
