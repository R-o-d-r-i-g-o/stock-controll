import { NextRequest } from "next/server";
import { errorHandler } from "../../common/api.error";
import { validateAuthUser } from "../../common/api.auth";

import companySvc from "./company.svc";

const getCompany = async (req: NextRequest) => {
  try {
    const user = await validateAuthUser(req);
    const company = await companySvc.getCompanyBy({ id: user.companyId });

    return Response.json(company, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

export { getCompany };
