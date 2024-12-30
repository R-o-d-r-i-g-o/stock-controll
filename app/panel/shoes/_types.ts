type GroupedItem = {
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
      groupeditems: GroupedItem[];
    }[];
  };
};

export type { TabelaProps, GroupedItem as GroupedItems };
