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
                if (!credentials) throw new Error("As credenciais não foram enviadas corretamente")

                try {
                    return await getAuthUser(credentials);
                } catch (err) {
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