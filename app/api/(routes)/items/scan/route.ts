import { NextRequest } from "next/server";
import * as svc from "@/app/api/_backend";

import auditSvc from "@/app/api/_backend/features/audit/audit.svc";
import { errorHandler } from "@/app/api/_backend/common/api.error";

import { validateAuthUser } from "@/common";
import { z } from "zod";

enum OperationType {
  Register = "register",
  Debit = "debit",
}

const formSchema = z.object({
  skus: z.array(z.string().min(1, "O SKU não pode ser vazio")),
  oprationType: z.enum([OperationType.Register, OperationType.Debit], {
    errorMap: () => ({
      message: "O campo 'oprationType' deve ser 'register' ou 'debit'",
    }),
  }),
});

const scanItem = async (req: NextRequest) => {
  try {
    const user = await validateAuthUser(req);

    const result = formSchema.safeParse(await req.json());
    if (result.error)
      return Response.json({ errors: result.error.errors }, { status: 400 });

    if (result.data.oprationType === OperationType.Debit) {
      await svc.debitItems({ userId: user!.id, skus: result.data.skus });
      await auditSvc.createAuditRecord({
        userId: user!.id,
        note: `O usuário debitou os itens: ${result.data.skus.join(", ")}`,
      });
      return Response.json(null, { status: 200 });
    }

    if (result.data.oprationType === OperationType.Register) {
      await svc.createItems({ userId: user!.id, skus: result.data.skus });
      await auditSvc.createAuditRecord({
        userId: user!.id,
        note: `O usuário criou os itens: ${result.data.skus.join(", ")}`,
      });
      return Response.json({ skus: result.data.skus }, { status: 200 });
    }
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

export { scanItem as POST };
