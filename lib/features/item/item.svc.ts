import * as repo from "./item.repo";
import * as t from "./item.types";

type ItemService = {
  getItemBy(input: t.GetShoeSvcInput): t.GetItemBySvcOutput;
  createItem(input: t.CreateShoeSvcInput): Promise<number>;
  updateItem(input: t.UpdateShoeSvcInput): Promise<void>;
  debitItems(input: t.DebitItemsSvcInput): Promise<void>;
  createItems(input: t.CreateItemsSvcInput): Promise<void>;
  deleteItem(input: number): Promise<void>;
};

const itemService = {} as ItemService;

itemService.getItemBy = async (filter) => {
  const s = await repo.getItemBy({ ...filter });

  return {
    id: s.id,
    sku: s.sku,
    size: s.size,
    price: s.price,
    shoeId: s.shoeId,
    createdAt: s.createdAt,
    deletedAt: s.deletedAt,
  };
};

itemService.createItem = async (data) => {
  const shoeId = await repo.createItem(data);
  return shoeId;
};

itemService.updateItem = async (data) => {
  await repo.updateItem(data);
};

itemService.deleteItem = async (id) => {
  await repo.deleteItem(id);
};

itemService.debitItems = async (data) => {
  await repo.debitItems(data);
};

itemService.createItems = async (data) => {
  await repo.createItems(data);
};

export default itemService;
