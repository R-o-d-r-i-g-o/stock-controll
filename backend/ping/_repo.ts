import { prisma } from "../prisma";

const pingDatabase = async () => {
  const result = await prisma.$queryRaw<number>`SELECT 1`;
  return result;
};

export { pingDatabase };
