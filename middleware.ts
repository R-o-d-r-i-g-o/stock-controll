import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export { default } from "next-auth/middleware";

export const config = { matcher: ["/panel/:path*"] };

export async function middleware(request: NextRequest) {
  const sessionCookies = await cookies();
  const authCookie = sessionCookies?.get("next-auth.session-token");

  const requestHeaders = new Headers(request.headers);
  if (authCookie)
    requestHeaders.set("Cookie", `next-auth.session-token=${authCookie.value}`);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}
