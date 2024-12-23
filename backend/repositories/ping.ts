import { prisma, prismaTransaction } from './_prisma'

const pingDatabase = async () => {
    return await prismaTransaction(async () => {
        const result = await prisma.$queryRaw<number>`SELECT 1`;
        return result
    })
}

export { pingDatabase };
