import { prisma, prismaTransaction } from "../prisma";
import moment from "moment";
import * as t from "./_types.repo";

const getItemBy = async (filter: t.getShoeByProps) => {
  return await prisma.shoe.findFirstOrThrow({
    where: {
      id: filter.id || undefined,
      size: filter.size || undefined,
      price: filter.price || undefined,
      hash_code: filter.sku || undefined,
    },
  });
};

const createItem = async (shoe: t.createShoeProps) => {
  return await prismaTransaction(async () => {
    const { id } = await prisma.shoe.create({
      data: {
        size: shoe.size,
        price: shoe.price,
        hash_code: shoe.sku,
        category_id: shoe.categoryId,
      },
    });
    return id;
  });
};

const updateItem = async (data: t.updateShoeProps) => {
  return await prismaTransaction(async () => {
    const shoe = await prisma.shoe.update({
      where: { id: data.id },
      data: {
        size: data.size || undefined,
        price: data.price || undefined,
        hash_code: data.sku || undefined,
        category_id: data.categoryId || undefined,
      },
    });
    return shoe;
  });
};

const deleteItem = async (id: number) => {
  return await prismaTransaction(async () => {
    const deletedShoe = await prisma.shoe.update({
      where: { id },
      data: { deleted_at: moment.utc().toDate() },
    });
    return deletedShoe;
  });
};

const debitItems = async (SKUs: string[]) => {
  const shoes = await prisma.shoe.findMany({
    where: { hash_code: { in: SKUs } },
    select: { id: true },
  });

  const data = shoes.map((u) => ({
    shoe_id: u.id,
    user_id: 1,
    note: "",
  }));

  await prisma.order.createMany({
    data: data,
  });
};

export { getItemBy, deleteItem, createItem, updateItem, debitItems };
