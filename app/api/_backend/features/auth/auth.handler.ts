import NextAuth from "next-auth";
import { nextAuthOptions } from "./auth.options";

const nextAuthHandler = NextAuth(nextAuthOptions);

export { nextAuthHandler };
