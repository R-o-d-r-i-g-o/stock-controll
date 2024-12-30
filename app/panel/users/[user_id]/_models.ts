type InitialStateEntries = {
  message: string;
  fieldValues: CreateUserFormEntries;
};

type CreateUserFormEntries = {
  id: string;
  name: string;
  email: string;
  roleId: string;
  password: string;
};

const initalState: InitialStateEntries = {
  message: "",
  fieldValues: {
    id: "",
    name: "",
    email: "",
    roleId: "",
    password: "",
  },
};

export { type InitialStateEntries, type CreateUserFormEntries, initalState };
