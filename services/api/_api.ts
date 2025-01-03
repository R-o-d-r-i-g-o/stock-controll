import axios from "axios";

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
      const { cookies } = await import("next/headers");

      const sessionCookies = await cookies();
      const authCookie = sessionCookies?.get("next-auth.session-token");

      if (authCookie) {
        // Note: set auth cookie such as happens in client-side automatically.
        request.headers.Cookie = `next-auth.session-token=${authCookie.value}`;
      }
    }
    return request;
  },
  (err) => Promise.reject(err)
);

export { isAxiosError, api };

export default api;
