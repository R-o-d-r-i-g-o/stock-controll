import { NextRequest } from "next/server";

import authSvc from "../features/auth/auth.svc";
import userSvc from "../features/user/user.svc";

async function validateAuthUser(req: NextRequest) {
  const authToken = req.headers.get("Authorization");
  if (!authToken) {
    throw new Error("Authentication not provided");
  }

  const userAuth = authSvc.verifyToken(authToken);
  const userData = await userSvc.getUserBy({ email: userAuth.email });
  if (!userData) {
    throw new Error("No user data found");
  }

  return userData;
}

export { validateAuthUser };
