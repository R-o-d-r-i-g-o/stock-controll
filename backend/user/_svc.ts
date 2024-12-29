import * as repo from "./_repo";
import * as h from "./_helper";
import * as t from "./_types.svc";

const { comparePasswords, encryptPassword } = h.hashHelper();

const getAuthUser = async (
  filter: t.getAuthUserProps
): Promise<t.getAuthUserResponse> => {
  const { email, password } = filter;

  const user = await repo.getUserBy({ email });
  if (!user) throw new Error("Usuário não encontrado");

  const passwordMatch = await comparePasswords(password, user.password);
  if (!passwordMatch) throw new Error("Não autorizado");

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

const getUserBy = async (filter: t.getUserProps) => {
  const user = await repo.getUserBy({ ...filter });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role_id: user.role_id,
    createdAt: user.created_at,
    deletedAt: user.deleted_at,
  };
};

const deleteUser = async (id: number) => {
  await repo.deleteUser(id);
};

const getUsersPaginated = async (filter: t.getUsersPaginatedProps) => {
  const parsedFilter = {
    skip: (filter.page - 1) * filter.size,
    take: filter.size,
  };

  const userCount = await repo.getusersCount(parsedFilter);
  const userList = await repo.getUsersPaginated(parsedFilter);

  return {
    meta: {
      ...filter,
      total: userCount,
    },
    users: userList.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      createdAt: u.created_at,
      deletedAt: u.deleted_at,
      role: u.role.name,
    })),
  };
};

const getRoleList = async () => {
  const roles = await repo.getRolesList();

  return {
    meta: {
      total: roles.length,
    },
    roles: roles.map((r) => ({
      id: r.id,
      name: r.name,
    })),
  };
};

const createUser = async (user: t.createUserProps) => {
  user.password = await encryptPassword(user.password);
  return await repo.createUser(user);
};

const updateUser = async (user: t.updateUserProps) => {
  if (user.password && user.password !== "")
    user.password = await encryptPassword(user.password);

  return await repo.updateUser(user);
};

export {
  getUserBy,
  createUser,
  updateUser,
  deleteUser,
  getAuthUser,
  getRoleList,
  getUsersPaginated,
};
