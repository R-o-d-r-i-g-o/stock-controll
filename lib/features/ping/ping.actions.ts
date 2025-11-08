"use server";

import moment from "moment";
import getConfig from "next/config";

import app from "@/package.json";
import pingSvc from "./ping.svc";

/**
 * Server Action to get health check data
 */
export async function getHealthDataAction() {
  try {
    const { publicRuntimeConfig } = getConfig();
    const modifiedDate = moment(publicRuntimeConfig.modifiedDate);

    const data = {
      message: "pong",
      version: app.version,
      database: await pingSvc.pingDatabase(),
      lastBuild: modifiedDate.format("YYYY-MM-DD HH:mm:ss"),
    };

    return { success: true, data };
  } catch (err) {
    return { success: false, error: "Erro ao obter dados de saúde" };
  }
}

