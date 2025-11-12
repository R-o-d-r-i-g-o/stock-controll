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
  freeTierExpiresAt?: Date | null;
};

type CreateCompanyOutput = Promise<number>;

type UpdateCompanyInput = {
  id: number;
  name?: string;
  subscriptionExpiresAt?: Date | null;
  freeTierExpiresAt?: Date | null;
};

type UpdateCompanyOutput = Promise<void>;

export type { getCompanyByInput, getCompanyByOutput, CreateCompanyInput, CreateCompanyOutput, UpdateCompanyInput, UpdateCompanyOutput };
