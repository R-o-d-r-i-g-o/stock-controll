import * as t from "./company.types";
import companyRepo from "./company.repo";

type CompanyService = {
  getCompanyBy(i: t.getCompanyByInput): t.getCompanyByOutput;
  createCompany(i: t.CreateCompanyInput): t.CreateCompanyOutput;
};

const companyService = {} as CompanyService;

companyService.createCompany = async (input) => {
  return companyRepo.createCompany(input);
};

companyService.getCompanyBy = (input) => {
  return companyRepo.getCompanyBy(input);
};

export default companyService;
