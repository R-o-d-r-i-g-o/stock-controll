export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/painel/:path*",
    "/api/users/:path*",
  ]
}