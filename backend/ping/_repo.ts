import { prisma, prismaTransaction } from "../prisma";

const pingDatabase = async () => {
  return await prismaTransaction(async () => {
    const result = await prisma.$queryRaw<number>`SELECT 1`;
    return result;
  });
};

export { pingDatabase };
