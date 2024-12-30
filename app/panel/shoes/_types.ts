type GroupedItem = {
  size: number;
  items: {
    id: number;
    price: number;
  }[];
};

type TabelaProps = {
  filter: {
    page: number;
    size: number;
  };
  data: {
    meta: {
      skip: number;
      take: number;
      total: number;
    };
    shoes: {
      id: number;
      name: string;
      sole: string;
      note: string;
      color: string;
      createdAt: string;
      deletedAt: string | null;
      groupedItems: GroupedItem[];
    }[];
  };
};

export type { TabelaProps, GroupedItem as GroupedItems };
