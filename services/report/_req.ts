import { api } from "../api";

const getReport = async () => {
  const res = await api.get("/api/reports");

  return {
    data: res.data,
    filename: res.headers["content-filename"],
  };
};

export { getReport };
