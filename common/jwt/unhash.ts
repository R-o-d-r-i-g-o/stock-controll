"use server";

import { NextRequest } from "next/server";
import * as svc from "@/backend";

async function validateAuthUser(req: NextRequest) {
  const senderEmail = req.headers.get("user-email");

  if (senderEmail) return await svc.getUserBy({ email: senderEmail });
  throw new Error("A sessão não foi encontrada");
}

export { validateAuthUser };
