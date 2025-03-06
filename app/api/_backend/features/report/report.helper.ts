import * as t from "../shoe/_svc.types";

// TODO: remove it latter.
const footSizesList = [
  33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
  52,
];

const formateStockReportColumnData = (
  shoes: t.getShoesGroupedByItemSizePaginatedRespose["shoes"]
) =>
  shoes.map((shoe) => {
    const itemCountBySize: { [size: number]: number } = {};

    shoe.groupedItems.forEach((group) => {
      itemCountBySize[group.size] =
        (itemCountBySize[group.size] || 0) + group.items.length;
    });

    footSizesList.forEach((footSize) => {
      itemCountBySize[footSize] = itemCountBySize[footSize] || 0;
    });

    return {
      "#": shoe.id,
      Nome: shoe.name,
      Solado: shoe.sole,
      Cor: shoe.color,
      ...itemCountBySize,
    };
  });

const formateExpeditionShoesReportColumnData = (
  shoes: { shoeName: string; amount: bigint }[]
) =>
  shoes.map((shoe) => ({
    "Nome calçado": shoe.shoeName,
    "Qntd.": Number(shoe.amount),
  }));

export { formateStockReportColumnData, formateExpeditionShoesReportColumnData };
