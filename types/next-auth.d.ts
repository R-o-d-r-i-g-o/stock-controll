declare module "next-auth" {
    interface User {
        id: number
        name: string
        email: string
    }
}
