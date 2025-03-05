import { NextRequest } from "next/server";

import svc from "./audit.svc";
import { getUsersPaginatedSchema } from "./audit.schema";
import { errorHandler, launchError } from "../../common/api.error";

import { validateAuthUser } from "../../common/api.auth";

const getUsersPaginated = async (req: NextRequest) => {
  try {
    await validateAuthUser(req);

    const searchParams = req.nextUrl.searchParams;

    const result = getUsersPaginatedSchema.safeParse({
      page: searchParams.get("page"),
      size: searchParams.get("size"),
    });
    if (result.error)
      return launchError(result.error.errors[0].message, 400).ToNextApiError();

    const audits = await svc.getAuditsPaginated(result.data);
    return Response.json(audits, { status: 200 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

export { getUsersPaginated };
