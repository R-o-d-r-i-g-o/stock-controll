import * as t from "./_svc.types";
import { footSizesList } from "../../common";

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

export { formateStockReportColumnData };
