"use server";

import { NextRequest } from "next/server";
import jwt from "next-auth/jwt";

import * as svc from "@/backend";

const secret = process.env.NEXTAUTH_SECRET;

async function validateAuthUser(req: NextRequest) {
  const token = await jwt.getToken({ req, secret });
  if (!token) throw new Error("A autenticação JWT não foi enviada");

  const user = svc.getUserBy({ email: token?.email });
  return user;
}

export { validateAuthUser };
