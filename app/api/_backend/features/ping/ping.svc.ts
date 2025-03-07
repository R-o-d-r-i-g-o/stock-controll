import pingRepo from "./ping.repo";
import * as t from "./ping.type";

type PingService = {
  pingDatabase(): t.PingDatabaseSvcOutput;
};

const pingService = {} as PingService;

pingService.pingDatabase = async () => {
  try {
    await pingRepo.pingDatabase();
    return true;
  } catch (err) {
    return false;
  }
};

export default pingService;
