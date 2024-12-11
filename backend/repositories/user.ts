import { prisma, prismaTransaction } from './_prisma'
import * as t from './_types'

const getUserByEmail = async (email: string) => {
    return await prismaTransaction(async () =>
        await prisma.user.findFirstOrThrow({ where: { email } })
    )
}

const createUser = async (user: t.createUserProps) => {
    return await prismaTransaction(async () => {
        const { id } = await prisma.user.create({ data: user })
        return id
    })
}

export { getUserByEmail, createUser };