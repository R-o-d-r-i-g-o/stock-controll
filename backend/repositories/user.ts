import prisma from './_prisma'

const getUserByEmail = async (email: string) => {
    await prisma.$connect();
    const user = await prisma.user.findFirstOrThrow({ where: { email } })
    await prisma.$disconnect();
    return user
}

export { getUserByEmail };