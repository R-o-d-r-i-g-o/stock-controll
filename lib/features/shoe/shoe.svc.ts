import shoeRepo from "./shoe.repo";
import * as t from "./shoe.types";
import { serializeDate } from "../../common/date-serializer";

type ShoeService = {
  getShoeBy(filter: t.getShoeBy): t.GetShoeBySvcOutput;
  deleteShoe(id: number): Promise<void>;
  createShoe(data: t.createShoe): Promise<number>;
  updateShoe(data: t.updateShoe): Promise<void>;
  getExpeditionShoes(filter: t.getExpeditionShoes): t.GetExpeditionShoesSvcOutput;
  getShoesGroupedBySizePaginated(filter: t.getShoesGroupedBySizePaginated): Promise<t.getShoesGroupedByItemSizePaginatedRespose>;
};

const shoeService = {} as ShoeService;

shoeService.getShoeBy = async (filter) => {
  const shoe = await shoeRepo.getShoeBy(filter);
  const { id, name, sole, note, color, createdAt, deletedAt, Item } = shoe;

  return {
    id,
    name,
    sole,
    color,
    note,
    createdAt: serializeDate(createdAt) as string,
    deletedAt: serializeDate(deletedAt),
    items: Item?.map((i) => ({
      id: i.id,
      sku: i.sku,
      size: i.size,
      price: i.price.toNumber(),
      createdAt: serializeDate(i.createdAt) as string,
      deletedAt: serializeDate(i.deletedAt),
    })),
  };
};

shoeService.getShoesGroupedBySizePaginated = async (filter) => {
  const parsedFilter = {
    skip: (filter.page - 1) * filter.size,
    take: filter.size,
    startDate: filter.startDate,
    endDate: filter.endDate,
  };

  const [shoesCount, shoesList] = await Promise.all([shoeRepo.getItemShoesCount(parsedFilter), shoeRepo.getItemShoesPaginated(parsedFilter)]);

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
      createdAt: serializeDate(createdAt) as string,
      deletedAt: serializeDate(deletedAt),
      groupedItems: itemsGroupedBySize,
    };
  });

  return {
    meta: { ...filter, total: shoesCount },
    shoes: ShoesGrouped,
  };
};

shoeService.getExpeditionShoes = async (filter) => {
  const expeditionShoes = await shoeRepo.getExpeditionShoes(filter);
  return expeditionShoes;
};

shoeService.createShoe = async (data) => {
  return await shoeRepo.createShoe(data);
};

shoeService.deleteShoe = async (id) => {
  await shoeRepo.deleteShoe(id);
};

shoeService.updateShoe = async (data) => {
  await shoeRepo.updateShoe(data);
};

export default shoeService;
