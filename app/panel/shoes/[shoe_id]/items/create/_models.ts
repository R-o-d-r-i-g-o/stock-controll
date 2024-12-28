
type InitialStateEntries = {
  message: string;
  fieldValues: CreateUserFormEntries;
}

type CreateUserFormEntries = {
  sku: string;
  size: string;
  price: string;
  categoryId: string;
}

const initalState: InitialStateEntries = {
  message: "",
  fieldValues: {
    sku: "",
    size: "",
    price: "",
    categoryId: "",
  }
}

export {
  type InitialStateEntries,
  type CreateUserFormEntries,
  initalState,
}