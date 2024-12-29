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
    audits: Array<{
      id: number;
      user: string;
      note: string;
      shoeId: number;
      createdAt: string;
    }>;
  };
};

export type { TabelaProps };
