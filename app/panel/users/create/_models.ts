type Entries = {
  message: string;
};

type CreateUserFormEntries = {
  name: string;
  email: string;
  roleId: string;
  password: string;
};

const initalState: Entries = {
  message: "",
};

export { type Entries, type CreateUserFormEntries, initalState };
