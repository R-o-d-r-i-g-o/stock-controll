type createUserProps = {
  name: string;
  email: string;
  role_id: number;
  password: string;
}

type updateUserProps = {
  id: number;
  name: string;
  email: string;
  role_id: number;
  password: string;
}

type getUsersPaginatedProps = {
  skip: number;
  take: number;
}

type getUserProps = {
  id?: number;
  name?: string;
  email?: string;
}

export type {
  updateUserProps,
  createUserProps,
  getUsersPaginatedProps,
  getUserProps,
}