type InitialStateEntries = {
  message: string;
  fieldValues: ItemUpdateFormEntries;
};

type ItemUpdateFormEntries = {
  id: string;
  sku: string;
  size: string;
  price: string;
  shoeId: string;
};

type ItemUpdateFormProps = {
  item: {
    id: number;
    sku: string;
    size: number;
    price: string;
    shoeId: number;
    createdAt: string;
    deletedAt: string | null;
  };
};

export type { InitialStateEntries, ItemUpdateFormEntries, ItemUpdateFormProps };
