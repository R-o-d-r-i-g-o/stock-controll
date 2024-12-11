type getAuthUserProps = {
    email: string;
    password: string;
}

type getAuthUserResponse = {
    id: number;
    name: string;
    email: string;
}

export type {
    getAuthUserProps,
    getAuthUserResponse
};