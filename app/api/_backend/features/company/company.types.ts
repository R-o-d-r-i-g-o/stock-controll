import { CompanyEntity } from "../../prisma/prisma.entity";

type getCompanyByInput = {
  id?: number;
  name?: string;
  code?: string;
  userId?: number;
};

type getCompanyByOutput = Promise<CompanyEntity | null>;

type CreateCompanyInput = {
  id?: number;
  name: string;
  code?: string;
};

type CreateCompanyOutput = Promise<number>;

export type { getCompanyByInput, getCompanyByOutput, CreateCompanyInput, CreateCompanyOutput };
