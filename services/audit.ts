import { api } from "./api/_api";
import * as t from "./_types";

const getAuditsPaginated = async (req: t.GetAuditsPaginated) => {
  const res = await api.get<t.GetAuditsPaginatedResponse>("/api/audits", {
    params: req,
  });
  return res.data;
};

export { getAuditsPaginated };
