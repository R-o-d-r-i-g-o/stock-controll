/* eslint @typescript-eslint/no-unused-vars: "off" */

import NextAuth from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    email: string;
    image: string;
    accessToken: string;
  }

  interface Session {
    user: User;
    accessToken: string;
  }
}
