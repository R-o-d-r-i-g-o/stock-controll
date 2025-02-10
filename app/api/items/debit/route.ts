import { NextRequest } from "next/server";
import * as svc from "@/backend";

import { validateAuthUser } from "@/common";

const debitItem = async (req: NextRequest) => {
  try {
    const user = await validateAuthUser(req);

    const payload = (await req.json()) as { skuList: string[] };
    if (!payload.skuList && payload.skuList < 1)
      throw new Error("Não foram trasida informações dos SKUs");

    await svc.debitItems(payload.skuList);
    await svc.createAudit({
      userId: user!.id,
      note: `O usuário debitou os itens: ${payload.skuList.join(", ")}`,
    });

    return Response.json(null, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
};

export { debitItem as POST };
