type createShoe = {
  color: string;
  sole: string;
  name: string;
  note: string;
};

type updateShoe = {
  id: number;
  color?: string;
  sole?: string;
  name?: string;
  note?: string;
};

type getShoeBy = {
  id?: number;
  name?: string;
};

type getShoesPaginated = {
  skip: number;
  take: number;
  startDate?: Date;
  endDate?: Date;
};

type getExpeditionShoes = {
  startDate: Date;
  endDate: Date;
};

export type {
  createShoe,
  updateShoe,
  getShoeBy,
  getShoesPaginated,
  getExpeditionShoes,
};
