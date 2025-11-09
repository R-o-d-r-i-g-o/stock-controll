"use server";

import moment from "moment";
import getConfig from "next/config";

import app from "@/package.json";
import pingSvc from "./ping.svc";
import { actionHandler } from "../../common/action-handler";

/**
 * Server Action to get health check data
 */
export async function getHealthDataAction() {
  return actionHandler(async () => {
    const { publicRuntimeConfig } = getConfig();
    const modifiedDate = moment(publicRuntimeConfig.modifiedDate);

    return {
      message: "pong",
      version: app.version,
      database: await pingSvc.pingDatabase(),
      lastBuild: modifiedDate.format("YYYY-MM-DD HH:mm:ss"),
    };
  });
}

