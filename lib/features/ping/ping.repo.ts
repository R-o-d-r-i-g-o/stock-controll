import { prisma } from "../../prisma/prisma.client";
import * as t from "./ping.type";

type PingRepository = {
  pingDatabase(): t.PingDatabaseRepoOutput;
};

const pingRepository = {} as PingRepository;

pingRepository.pingDatabase = async () => {
  await prisma.$queryRaw<number>`SELECT 1`;
};

export default pingRepository;
