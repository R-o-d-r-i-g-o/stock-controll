type getAuthUserProps = {
    email: string;
    password: string;
}

type getAuthUserResponse = {
    id: number;
    name: string;
    email: string;
}

type createUserProps = {
    name: string;
    email: string;
    role_id: number;
    password: string;
}

export type {
    getAuthUserProps,
    getAuthUserResponse,
    createUserProps,
};