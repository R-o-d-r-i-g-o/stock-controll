type InitialStateEntries = {
  message: string;
  fieldValues: CreateUserFormEntries;
};

type CreateUserFormEntries = {
  name: string;
  email: string;
  roleId: string;
  password: string;
};

const initalState: InitialStateEntries = {
  message: "",
  fieldValues: {
    name: "",
    email: "",
    roleId: "",
    password: "",
  },
};

export { type InitialStateEntries, type CreateUserFormEntries, initalState };
