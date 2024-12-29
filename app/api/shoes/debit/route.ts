import { NextRequest } from "next/server";
import * as svc from "@/backend/services";

const debitShoe = async (req: NextRequest) => {
  try {
    const payload = (await req.json()) as { skuList: string[] };
    if (!payload.skuList && payload.skuList < 1)
      throw new Error("Não foram trasida informações dos SKUs");

    await svc.debitItems(payload.skuList);
    return Response.json(null, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

export { debitShoe as POST };
