type TabelaProps = {
  filter: {
    page: number
    size: number
  },
  data: {
    meta: {
      skip: number;
      take: number;
      total: number;
    };
    users: Array<{
      id: number;
      name: string;
      role: string;
      email: string;
      createdAt: string;
      deletedAt: string | null;
    }>;
  }
}

export type { TabelaProps };