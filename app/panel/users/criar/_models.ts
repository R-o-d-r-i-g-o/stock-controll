type InitialStateEntries = {
  message: string;
  fieldValues: CreateUserFormEntries;
};

type CreateUserFormEntries = {
  name: string;
  email: string;
  role_id: string;
  password: string;
};

const initalState: InitialStateEntries = {
  message: "",
  fieldValues: {
    name: "",
    email: "",
    role_id: "",
    password: "",
  },
};

export { type InitialStateEntries, type CreateUserFormEntries, initalState };
