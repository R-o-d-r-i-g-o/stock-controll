import axios from "axios";
import { auth } from "@/app/api/_backend/features/auth/auth.handler"; //TODO: improve it later.
import { isServerSide } from "@/common/utilities";

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
    next: { revalidate: false },
  },
});

// Authentication middleware proxy
api.interceptors.request.use(async (req) => {
  const handleAuth = (token: string) => (req.headers["Authorization"] = token);

  const handleClientCheck = () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`, { method: "GET", cache: "force-cache" });

  if (!isServerSide()) {
    const response = await handleClientCheck();

    if (response.ok) {
      const session = await response.json();
      if (session) handleAuth(session.accessToken);
    }
    return req;
  }

  const session = await auth.auth();
  if (session) handleAuth(session.accessToken);
  return req;
}, Promise.reject);

export { isAxiosError, api };

export default api;
