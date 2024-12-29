import * as repo from "./_repo";
import * as t from "./_types.svc";

const getItemBy = async (filter: t.getShoeByProps) => {
  const s = await repo.getItemBy({ ...filter });

  return {
    id: s.id,
    sku: s.hash_code,
    size: s.size,
    price: s.price,
    categoryId: s.category_id,
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
