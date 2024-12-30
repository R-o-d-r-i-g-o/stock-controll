import moment from "moment";
import getConfig from "next/config";

import app from "@/package.json";
import { pingDatabase } from "@/backend";

const setupPing = async () => {
  const { publicRuntimeConfig } = getConfig();
  const modifiedDate = moment(publicRuntimeConfig.modifiedDate);

  const res = {
    message: "pong",
    version: app.version,
    database: await pingDatabase(),
    lastBuild: modifiedDate.format("YYYY-MM-DD HH:mm:ss"),
  };
  return Response.json(res, { status: 200 });
};

export { setupPing as GET };
