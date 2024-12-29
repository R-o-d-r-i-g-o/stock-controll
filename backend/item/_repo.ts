import { prisma, prismaTransaction } from "../prisma";
import moment from "moment";
import * as t from "./_types.repo";

const getItemBy = async (filter: t.getShoeByProps) => {
  return await prisma.item.findFirstOrThrow({
    where: {
      id: filter.id || undefined,
      sku: filter.sku || undefined,
      size: filter.size || undefined,
      price: filter.price || undefined,
    },
  });
};

const createItem = async (shoe: t.createShoeProps) => {
  return await prismaTransaction(async () => {
    const { id } = await prisma.item.create({
      data: {
        sku: shoe.sku,
        size: shoe.size,
        price: shoe.price,
        shoe_id: shoe.shoeId,
      },
    });
    return id;
  });
};

const updateItem = async (data: t.updateShoeProps) => {
  return await prismaTransaction(async () => {
    const shoe = await prisma.item.update({
      where: { id: data.id },
      data: {
        sku: data.sku || undefined,
        size: data.size || undefined,
        price: data.price || undefined,
        shoe_id: data.shoeId || undefined,
      },
    });
    return shoe;
  });
};

const deleteItem = async (id: number) => {
  return await prismaTransaction(async () => {
    const deletedShoe = await prisma.item.update({
      where: { id },
      data: { deleted_at: moment.utc().toDate() },
    });
    return deletedShoe;
  });
};

const debitItems = async (SKUs: string[]) => {
  const shoes = await prisma.item.findMany({
    where: { sku: { in: SKUs } },
    select: { id: true },
  });

  const data = shoes.map((u) => ({
    item_id: u.id,
    user_id: 1,
    note: "",
  }));

  await prisma.order.createMany({
    data: data,
  });
};

export { getItemBy, deleteItem, createItem, updateItem, debitItems };
