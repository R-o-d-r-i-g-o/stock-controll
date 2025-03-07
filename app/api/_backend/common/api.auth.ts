import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import userSvc from "../features/user/user.svc";

const secret = process.env.NEXTAUTH_SECRET;

async function validateAuthUser(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (token) return await userSvc.getUserBy({ email: token.email });

  // Note: allow get requests to be made 'cause cors in setted to application only.
  if (req.method.toUpperCase() == "GET") return;

  throw new Error("A sessão não foi encontrada");
}

export { validateAuthUser };
