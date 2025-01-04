export { default } from "next-auth/middleware";

import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export const config = { matcher: ["/panel/:path*"] };

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET! });

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("user-email", token?.email ?? "");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
