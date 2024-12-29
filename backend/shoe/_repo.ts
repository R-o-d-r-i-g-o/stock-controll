import { prisma, prismaTransaction } from "../prisma";
import moment from "moment";
import * as t from "./_repo.types";

const getCategoryBy = async (filter: t.getCategoryByProps) => {
  const category = await prisma.shoe.findFirstOrThrow({
    where: {
      id: filter.id || undefined,
      name: filter.name || undefined,
    },
    include: {
      Item: {
        where: { deleted_at: null },
        orderBy: { size: "asc" },
      },
    },
  });

  return category;
};

const getCategoryShoesCount = async (filter: t.getShoesPaginatedProps) => {
  console.log("filters", filter);
  const shoesGroupedByCategory = await prisma.shoe.count({
    where: { deleted_at: null },
  });

  return shoesGroupedByCategory;
};

const getCategoryShoesPaginated = async (filter: t.getShoesPaginatedProps) => {
  const shoesGroupedByCategory = await prisma.shoe.findMany({
    skip: filter.skip,
    take: filter.take,
    where: { deleted_at: null },
    include: {
      Item: {
        where: { deleted_at: null },
        orderBy: { size: "asc" },
      },
    },
  });

  return shoesGroupedByCategory;
};

const deleteCategory = async (id: number) => {
  return await prismaTransaction(async () => {
    const deletedCategory = await prisma.shoe.update({
      where: { id },
      data: { deleted_at: moment.utc().toDate() },
    });
    return deletedCategory;
  });
};

const updateCategory = async (user: t.updateCategoryProps) => {
  return await prismaTransaction(async () => {
    await prisma.shoe.update({
      where: { id: user.id },
      data: {
        name: user.name || undefined,
        sole: user.sole || undefined,
        note: user.note || undefined,
        color: user.color || undefined,
      },
    });
  });
};

const createCategory = async (data: t.createCategoryProps) => {
  const { id } = await prisma.shoe.create({
    data: {
      name: data.name,
      sole: data.sole,
      note: data.note,
      color: data.color,
    },
  });
  return id;
};

export {
  updateCategory,
  deleteCategory,
  createCategory,
  getCategoryBy,
  getCategoryShoesCount,
  getCategoryShoesPaginated,
};
