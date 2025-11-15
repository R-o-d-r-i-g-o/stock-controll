import repo from "./user.repo";
import * as h from "./user.helper";
import * as t from "./user.types";
import { serializeDate } from "../../common/date-serializer";

type UserService = {
  getRoleList(): t.GetRolesSvcOutput;
  getUserBy(input: t.getUserProps): t.GetUserBySvcOutput;
  getAuthUser(input: t.getAuthUserProps): t.GetAuthUserSvcOutput;
  createUser(input: t.createUserProps): Promise<number>;
  updateUser(input: t.updateUserProps): Promise<void>;
  deleteUser(input: number): Promise<void>;
  getUsersPaginated(input: t.getUsersPaginatedProps): t.GetUsersPaginatedSvcOutput;
  getUsersActiveByDate(input: t.GetUsersActiveByDateInput): Promise<t.GetUsersActiveByDateOutput>;
};

const userService = {} as UserService;

const { comparePasswords, encryptPassword } = h.hashHelper();

userService.getAuthUser = async (filter) => {
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

userService.getUserBy = async (filter) => {
  const user = await repo.getUserBy({ ...filter });

  return {
    id: user.id,
    code: user.code,
    name: user.name,
    email: user.email,
    roleId: user.roleId,
    roleName: user.Role.name,
    companyId: user.companyId,
    createdAt: serializeDate(user.createdAt) as string,
    deletedAt: serializeDate(user.deletedAt),
  };
};

userService.deleteUser = async (id) => {
  await repo.deleteUser(id);
};

userService.getUsersPaginated = async (filter) => {
  const parsedFilter = {
    skip: (filter.page - 1) * filter.size,
    take: filter.size,
  };

  const [userCount, userList] = await Promise.all([repo.getUsersCount(parsedFilter), repo.getUsersPaginated(parsedFilter)]);

  return {
    meta: {
      ...filter,
      total: userCount,
    },
    users: userList.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.Role.name,
      createdAt: serializeDate(u.createdAt) as string,
      deletedAt: serializeDate(u.deletedAt),
    })),
  };
};

userService.getRoleList = async () => {
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

userService.createUser = async (user) => {
  user.password = await encryptPassword(user.password);
  return await repo.createUser(user);
};

userService.updateUser = async (user) => {
  if (user.password && user.password !== "") {
    user.password = await encryptPassword(user.password);
  }
  await repo.updateUser(user);
};

userService.getUsersActiveByDate = async (input) => {
  return await repo.getUsersActiveByDate(input);
};

export default userService;
