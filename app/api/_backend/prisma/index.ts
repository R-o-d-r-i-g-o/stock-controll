import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const prismaTransaction = async <T>(func: () => Promise<T>) => {
  await prisma.$connect();
  const obj = await func();
  await prisma.$disconnect();
  return obj;
};

export { prisma, prismaTransaction };

export default prisma;
