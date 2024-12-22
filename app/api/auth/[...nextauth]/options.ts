import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { getAuthUser } from '@/backend/services'

const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { type: "email" },
                password: { type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials)
                        throw new Error("Credenciais não encontradas")

                    return await getAuthUser(credentials);
                } catch (err) {
                    console.error(err)
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/entrar",
    },
};

export { options };