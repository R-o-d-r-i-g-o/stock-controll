"use server";

import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import jwt from "next-auth/jwt";

import { options } from "@/app/api/auth/[...nextauth]/options";
import * as svc from "@/backend";

const secret = process.env.NEXTAUTH_SECRET;

const cookieName =
  process.env.VERCEL_ENV === "development"
    ? "next-auth.session-token"
    : "__Secure-next-auth.session-token";

async function validateAuthUser(req: NextRequest) {
  const [token, session] = await Promise.all([
    jwt.getToken({ req, secret, cookieName }),
    getServerSession(options),
  ]);

  console.log("trouxe aqui no auth", token, session);

  // Note: the email field is check as unique in database.
  if (session) return await svc.getUserBy({ email: session.user.email });
  if (token) return await svc.getUserBy({ email: token.email });

  throw new Error("A sessão não foi encontrada");
}

export { validateAuthUser };
