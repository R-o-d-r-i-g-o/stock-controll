type InitialStateEntries = {
  message: string;
  fieldValues: CreateUserFormEntries;
};

type CreateUserFormEntries = {
  id: string;
  sku: string;
  size: string;
  price: string;
  shoeId: string;
};

export { type InitialStateEntries, type CreateUserFormEntries };
