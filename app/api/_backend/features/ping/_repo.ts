import { prisma } from "../../prisma/prisma.client";

const pingDatabase = async () => {
  const result = await prisma.$queryRaw<number>`SELECT 1`;
  return result;
};

export { pingDatabase };
