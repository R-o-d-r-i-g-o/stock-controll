import * as t from "./company.types";
import { prisma } from "../../prisma/prisma.client";

type CompanyRepository = {
  getCompanyBy(i: t.getCompanyByInput): t.getCompanyByOutput;
  createCompany(i: t.CreateCompanyInput): t.CreateCompanyOutput;
};

const companyRepository = {} as CompanyRepository;

companyRepository.createCompany = async (input) => {
  const { id } = await prisma.company.create({ data: input });
  return id;
};

companyRepository.getCompanyBy = (input) => {
  return prisma.company.findFirst({
    where: {
      id: input.id,
      name: input.name,
      code: input.code,
      User: {
        some: {
          id: input.userId,
        },
      },
    },
  });
};

export default companyRepository;
