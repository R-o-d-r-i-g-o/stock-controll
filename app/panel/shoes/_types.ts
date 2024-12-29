type GroupedShoe = {
  size: number;
  shoes: {
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
    categories: {
      id: number;
      name: string;
      sole: string;
      note: string;
      color: string;
      createdAt: string;
      deletedAt: string | null;
      groupedShoes: GroupedShoe[];
    }[];
  };
};

export type { TabelaProps, GroupedShoe };
