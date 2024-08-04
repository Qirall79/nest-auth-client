import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/actions";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  const response = NextResponse.next();
  if (session.accessToken) {
    response.cookies.set("access_token", session.accessToken);
    response.cookies.set("refresh_token", session.refreshToken);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
