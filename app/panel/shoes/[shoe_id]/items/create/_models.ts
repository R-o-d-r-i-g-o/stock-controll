type InitialStateEntries = {
  message: string;
  fieldValues: CreateUserFormEntries;
};

type CreateUserFormEntries = {
  sku: string;
  size: string;
  price: string;
  shoeId: string;
};

type ItemCreationFormProps = {
  shoeId: number;
};

const initalState: InitialStateEntries = {
  message: "",
  fieldValues: {
    sku: "",
    size: "",
    price: "",
    shoeId: "",
  },
};

export {
  type InitialStateEntries,
  type CreateUserFormEntries,
  type ItemCreationFormProps,
  initalState,
};
