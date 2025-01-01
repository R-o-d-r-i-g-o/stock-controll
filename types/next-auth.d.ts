import NextAuth from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    email: string;
  }

  interface Session {
    user: User;
    jwt: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    name: string;
    email: string;
    iat?: number;
    exp?: number;
    jti?: string;
  }
}
