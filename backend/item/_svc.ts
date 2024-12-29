import * as repo from "./_repo";
import * as t from "./_svc.types";

const getItemBy = async (filter: t.getShoeByProps) => {
  const s = await repo.getItemBy({ ...filter });

  return {
    id: s.id,
    sku: s.sku,
    size: s.size,
    price: s.price,
    categoryId: s.shoe_id,
    createdAt: s.created_at,
    deletedAt: s.deleted_at,
  };
};

const createItem = async (data: t.createShoeProps) => {
  const shoeId = await repo.createItem(data);
  return shoeId;
};

const updateItem = async (data: t.updateShoeProps) => {
  const shoe = await repo.updateItem(data);
  return shoe;
};

const deleteItem = async (id: number) => {
  const shoe = await repo.deleteItem(id);
  return shoe;
};

const debitItems = async (SKUs: string[]) => {
  await repo.debitItems(SKUs);
};

export { getItemBy, createItem, deleteItem, updateItem, debitItems };
