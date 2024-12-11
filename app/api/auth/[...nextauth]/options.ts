import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { useHash } from "@/hooks";

const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { type: "email" },
                password: { type: "password" },
            },
            async authorize(credentials) {
                try {
                    const { email, password } = credentials!;

                    // const registredUser = { password: '123456', } //await getAuthUser(email);
                    // const passwordMatch = await useHash().comparePasswords(
                    //     password,
                    //     registredUser.password
                    // );
                    // if (!passwordMatch) throw new Error();

                    return {
                        id: "user-code",
                        email: email,
                    };
                } catch (err) {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/",
    },
};

export { options };