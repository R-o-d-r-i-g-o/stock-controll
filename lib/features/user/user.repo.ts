import { prisma, prismaTransaction } from "../../prisma/prisma.client";
import moment from "moment";
import * as t from "./user.types";

type UserRepository = {
  createUser(user: t.createUser): Promise<number>;
  updateUser(user: t.updateUser): Promise<void>;
  deleteUser(id: number): t.DeleteUserRepoOutput;
  getUserBy(filter: t.getUser): t.GetUserByRepoOutput;
  getUsersCount(filter: t.getUsersPaginated): Promise<number>;
  getUsersPaginated(filter: t.getUsersPaginated): t.GetUsersPaginatedRepoOutput;
  getRolesList(): t.GetRolesListRepoOutput;
  getUsersActiveByDate(input: t.GetUsersActiveByDateInput): Promise<t.GetUsersActiveByDateOutput>;
};

const userRepository = {} as UserRepository;

userRepository.createUser = async (user) => {
  return await prismaTransaction(async () => {
    const { id } = await prisma.user.create({ data: user });
    return id;
  });
};

userRepository.updateUser = async (user) => {
  await prismaTransaction(async () => {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name || undefined,
        email: user.email || undefined,
        roleId: user.roleId || undefined,
        password: user.password || undefined,
      },
    });
  });
};

userRepository.deleteUser = async (id) => {
  return await prismaTransaction(async () => {
    return await prisma.user.update({
      where: { id },
      data: { deletedAt: moment.utc().toDate() },
    });
  });
};

userRepository.getUserBy = async (filter) => {
  return await prisma.user.findFirstOrThrow({ 
    where: { ...filter },
    include: { Role: true }
  });
};

userRepository.getUsersCount = async (filter) => {
  console.log("filter", filter);
  return await prisma.user.count();
};

userRepository.getUsersPaginated = async (filter) => {
  return await prisma.user.findMany({
    take: filter.take,
    skip: filter.skip,
    include: { Role: true },
  });
};

userRepository.getRolesList = async () => {
  return await prisma.role.findMany();
};

userRepository.getUsersActiveByDate = async (input) => {
  const formatDate = (date: Date) => moment(date).format("YYYY-MM-DD");

  const result = await prisma.$queryRaw<Array<{ date: string; count: bigint }>>`
    SELECT
      DATE(created_at) as date,
      COUNT(*)::int as count
    FROM go_live.tb_users
    WHERE company_id = ${input.companyId}
      AND deleted_at IS NULL
      AND created_at >= CAST(${formatDate(input.startDate)} AS DATE)
      AND created_at <= CAST(${formatDate(input.endDate)} AS DATE)
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at) ASC
  `;

  return result.map((row) => ({
    date: row.date,
    count: Number(row.count),
  }));
};

export default userRepository;
