import moment from "moment";
import getConfig from "next/config";

import app from "@/package.json";
import { pingDatabase } from "@/backend";

const setupPing = async () => {
  const { publicRuntimeConfig } = getConfig();
  const modifiedDate = moment(publicRuntimeConfig.modifiedDate).format(
    "YYYY-MM-DD HH:mm:ss"
  );

  const res = {
    message: "pong",
    version: app.version,
    database: await pingDatabase(),
    last_build: modifiedDate,
  };

  return Response.json(res, { status: 200 });
};

export { setupPing as GET };
