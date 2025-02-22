import { api } from "../api";
import * as t from "./_types";

const fetchHealthData = async () => {
  const res = await api.get<t.HealthCheckResponse>("/api/ping");
  return res.data;
};

export { fetchHealthData };
