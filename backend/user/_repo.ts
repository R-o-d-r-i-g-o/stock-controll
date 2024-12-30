import { prisma, prismaTransaction } from "../prisma";
import moment from "moment";
import * as t from "./_repo.types";

const createUser = async (user: t.createUser) => {
  return await prismaTransaction(async () => {
    const { id } = await prisma.user.create({ data: user });
    return id;
  });
};

const updateUser = async (user: t.updateUser) => {
  return await prismaTransaction(async () => {
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

const deleteUser = async (id: number) => {
  return await prismaTransaction(async () => {
    const userdeleted = await prisma.user.update({
      where: { id },
      data: { deletedAt: moment.utc().toDate() },
    });
    return userdeleted;
  });
};

const getUserBy = async (filter: t.getUser) => {
  return await prisma.user.findFirstOrThrow({ where: { ...filter } });
};

const getusersCount = async (filter: t.getUsersPaginated) => {
  console.log("filter", filter);
  return await prisma.user.count();
};

const getUsersPaginated = async (filter: t.getUsersPaginated) => {
  return await prisma.user.findMany({
    take: filter.take,
    skip: filter.skip,
    include: { role: true },
  });
};

const getRolesList = async () => {
  return await prisma.role.findMany();
};

export {
  updateUser,
  createUser,
  deleteUser,
  getUserBy,
  getusersCount,
  getUsersPaginated,
  getRolesList,
};
