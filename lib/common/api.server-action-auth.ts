import { auth } from "../features/auth/auth.handler";
import userSvc from "../features/user/user.svc";

/**
 * Validates the authenticated user in Server Actions context
 * Uses next-auth session instead of Authorization header
 */
async function validateAuthUserServerAction() {
  const session = await auth.auth();
  
  if (!session || !session.user?.email) {
    throw new Error("Authentication not provided");
  }

  const userData = await userSvc.getUserBy({ email: session.user.email });
  if (!userData) {
    throw new Error("No user data found");
  }

  return userData;
}

export { validateAuthUserServerAction };

