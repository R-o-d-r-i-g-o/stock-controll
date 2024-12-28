
type InitialStateEntries = {
  message: string;
  fieldValues: CreateUserFormEntries;
}

type CreateUserFormEntries = {
  id: string;
  sku: string;
  size: string;
  price: string;
  categoryId: string;
}

export {
  type InitialStateEntries,
  type CreateUserFormEntries,
}