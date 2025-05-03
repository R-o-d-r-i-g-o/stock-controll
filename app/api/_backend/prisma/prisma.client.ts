import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const prismaTransaction = async <T>(func: () => Promise<T>) => {
  await prisma.$connect();
  const obj = await func();
  await prisma.$disconnect();
  return obj;
};

export { prisma, Prisma, prismaTransaction };

export default prisma;
