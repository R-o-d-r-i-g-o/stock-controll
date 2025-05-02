import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import authSvc from "./auth.svc";
import userSvc from "../user/user.svc";

import { loginSchema } from "./auth.schema";

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

const nextAuthConfig: NextAuthConfig = {
  providers,
  callbacks,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: eightHours,
  },
};

export { nextAuthConfig };

export const { handlers, ...auth } = NextAuth(nextAuthConfig);
