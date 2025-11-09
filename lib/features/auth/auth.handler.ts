import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import * as h from "../user/user.helper";

import authSvc from "./auth.svc";
import userSvc from "../user/user.svc";
import auditSvc from "../audit/audit.svc";
import companySvc from "../company/company.svc";

import { NextRequest } from "next/server";
import { errorHandler, launchError } from "../../common/api.error";
import { loginSchema, registerSchema } from "./auth.schema";

const { encryptPassword } = h.hashHelper();

const formatAuthConfig = (): NextAuthConfig => {
  const eightHours = 8 * 60 * 60;

  const providers: NextAuthConfig["providers"] = [
    CredentialsProvider({
      credentials: {
        email: { type: "email", required: true },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const data = loginSchema.parse(credentials);
        const user = await userSvc.getAuthUser(data);

        // TODO: return accessToken on its own object when beta version of next-auth correct it.
        const accessToken = authSvc.generateToken(user);

        return { ...user, image: accessToken, accessToken };
      },
    }),
  ];

  const callbacks: NextAuthConfig["callbacks"] = {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      // TODO: when fix line 21, fix it here too.
      session.accessToken = token.picture!;
      return session;
    },
  };

  const session: NextAuthConfig["session"] = {
    strategy: "jwt",
    maxAge: eightHours,
  };

  const pages: NextAuthConfig["pages"] = {
    signIn: "/login",
  };

  return {
    providers,
    callbacks,
    session,
    pages,
  };
};

const register = async (req: NextRequest) => {
  try {
    const { data, error: err } = registerSchema.safeParse(await req.json());
    if (err) return launchError(err.errors[0].message, 400).ToNextApiError();

    const companyId = await companySvc.createCompany({
      name: data.companyName,
    });

    const userId = await userSvc.createUser({
      name: data.username,
      email: data.email,
      roleId: 2, // admin
      password: await encryptPassword(data.password),
      companyId,
    });

    await auditSvc.createAuditRecord({
      userId,
      companyId,
      note: `O usuário se registrou e criou a compania atual.`,
    });

    return Response.json(null, { status: 201 });
  } catch (err) {
    return errorHandler(err).ToNextApiError();
  }
};

const nextAuthConfig = formatAuthConfig();

const { handlers, ...auth } = NextAuth(nextAuthConfig);

export { nextAuthConfig, handlers, register, auth };
