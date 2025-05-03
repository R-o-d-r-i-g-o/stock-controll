import { PrismaClient, Prisma } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

const prismaTransaction = async <T>(func: () => Promise<T>) => {
  await prisma.$connect();
  const obj = await func();
  await prisma.$disconnect();
  return obj;
};

export { prisma, Prisma, prismaTransaction };

export default prisma;
