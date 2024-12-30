import * as repo from "./_repo";
import * as t from "./_svc.types";

const getShoeBy = async (filter: t.getShoeBy) => {
  const shoe = await repo.getShoeBy(filter);
  const { id, name, sole, note, color, createdAt, deletedAt, Item } = shoe;

  return {
    id,
    name,
    sole,
    color,
    note,
    createdAt: createdAt,
    deletedAt: deletedAt,
    items: Item?.map((i) => ({
      id: i.id,
      sku: i.sku,
      size: i.size,
      price: i.price.toNumber(),
      createdAt: i.createdAt,
      deletedAt: i.deletedAt,
    })),
  };
};

const getShoesGroupedBySizePaginated = async (
  filter: t.getShoesGroupedBySizePaginated
) => {
  const parsedFilter = {
    skip: (filter.page - 1) * filter.size,
    take: filter.size,
  };

  const shoesCount = await repo.getItemShoesCount(parsedFilter);
  const shoesList = await repo.getItemShoesPaginated(parsedFilter);

  const ShoesGrouped = shoesList?.map((shoe) => {
    const { id, name, sole, note, color, createdAt, deletedAt, Item } = shoe;

    const itemsGroupedBySize = Object.values(
      Item?.reduce<t.Accumulator>((acc, item) => {
        if (!acc[item.size]) acc[item.size] = { size: item.size, items: [] };

        acc[item.size].items.push({
          id: item.id,
          price: item.price.toNumber(),
        });
        return acc;
      }, {})
    );

    return {
      id,
      name,
      sole,
      color,
      note,
      createdAt: createdAt,
      deletedAt: deletedAt,
      groupedItems: itemsGroupedBySize,
    };
  });

  return {
    meta: { ...filter, total: shoesCount },
    categories: ShoesGrouped,
  };
};

const deleteShoe = async (id: number) => {
  const deletedShoe = await repo.deleteShoe(id);
  return deletedShoe;
};

const createShoe = async (data: t.createShoe) => {
  return await repo.createShoe(data);
};

const updateShoe = async (data: t.updateShoe) => {
  await repo.updateShoe(data);
};

export {
  getShoesGroupedBySizePaginated,
  getShoeBy as getShoeBy,
  createShoe,
  deleteShoe,
  updateShoe,
};
