import * as t from "./company.types";
import { prisma } from "../../prisma/prisma.client";

type CompanyRepository = {
  getCompanyBy(i: t.getCompanyByInput): t.getCompanyByOutput;
  createCompany(i: t.CreateCompanyInput): t.CreateCompanyOutput;
  updateCompany(i: t.UpdateCompanyInput): t.UpdateCompanyOutput;
};

const companyRepository = {} as CompanyRepository;

companyRepository.createCompany = async (input) => {
  const { id } = await prisma.company.create({ data: input });
  return id;
};

companyRepository.getCompanyBy = (input) => {
  return prisma.company.findFirst({
    where: {
      id: input.id || undefined,
      name: input.name || undefined,
      code: input.code || undefined,
      User: {
        some: {
          id: input.userId || undefined,
        },
      },
    },
  });
};

companyRepository.updateCompany = async (input) => {
  await prisma.company.update({
    where: { id: input.id },
    data: {
      name: input.name || undefined,
      subscriptionExpiresAt:input.subscriptionExpiresAt || undefined,
    },
  });
};

export default companyRepository;
