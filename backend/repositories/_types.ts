type createUserProps = {
  name: string;
  email: string;
  role_id: number;
  password: string;
}

type getUsersPaginatedProps = {
  skip: number;
  take: number;
}

export type {
  createUserProps,
  getUsersPaginatedProps,
}