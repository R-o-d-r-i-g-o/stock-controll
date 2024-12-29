import axios from "axios";
import { CacheCustomKeys } from "./_cache";

enum Timeout {
  _60sec = 1000 * 60,
  _15min = 1000 * 60 * 15,
}

const { isAxiosError, create } = axios;

const api = create({
  timeout: Timeout._60sec,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  adapter: "fetch",
  headers: {
    "Content-Type": "application/json",
  },
  fetchOptions: <RequestInit>{
    cache: "no-store",
    next: { revalidate: 0 },
  },
});

export { CacheCustomKeys, isAxiosError, api };

export default api;
