import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { getAuthUser } from "@/backend";
import { NavigationPage } from "@/common";

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    credentials: {
      email: { type: "email" },
      password: { type: "password" },
    },
    async authorize(credentials) {
      try {
        if (!credentials) throw new Error("Credenciais não encontradas");

        return await getAuthUser(credentials);
      } catch (err) {
        console.error(err);
        return null;
      }
    },
  }),
];

const callbacks: NextAuthOptions["callbacks"] = {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id as number;
      token.name = user.name;
      token.email = user.email;
    }
    return token;
  },
  async session({ session, token }) {
    if (token) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
    }

    return session;
  },
};

const options: NextAuthOptions = {
  providers,
  callbacks,
  pages: {
    signIn: NavigationPage.Login,
  },
};

export { options };
