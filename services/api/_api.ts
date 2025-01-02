import axios from "axios";
import { getServerSession } from "next-auth";

const { isAxiosError, create } = axios;

// Enum for timeout configurations (e.g., 60 seconds).
enum Timeout {
  _60sec = 1000 * 60,
}

// Axios instance with custom settings for requests.
const api = create({
  timeout: Timeout._60sec,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  adapter: "fetch",
  headers: {
    "Content-Type": "application/json",
  },
  // Prevent caching responses once next framework depends on fetch api nativelly.
  fetchOptions: <RequestInit>{
    cache: "no-store",
    next: { revalidate: 0 },
  },
});

api.interceptors.request.use(
  async (request) => {
    if (typeof window === "undefined") {
      const auth = await getServerSession();
      if (auth) {
        request.headers["senderserver"] = auth.user.email;
      }
    }

    console.log("setou o novo header no req", request.headers);

    return request;
  },
  (err) => Promise.reject(err)
);

export { isAxiosError, api };

export default api;
