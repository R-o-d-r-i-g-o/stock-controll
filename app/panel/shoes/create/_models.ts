type InitialStateEntries = {
  message: string;
  fieldValues: CreateUserFormEntries;
};

type CreateUserFormEntries = {
  name: string;
  sole: string;
  note: string;
  color: string;
};

const initialState: InitialStateEntries = {
  message: "",
  fieldValues: {
    name: "",
    sole: "",
    note: "",
    color: "",
  },
};

export { type InitialStateEntries, type CreateUserFormEntries, initialState };
