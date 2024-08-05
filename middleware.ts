import { NextRequest, NextResponse } from "next/server";
import { getSession, refresh } from "./lib/actions";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const accessToken = cookies().get("access_token")?.value;
  const refreshToken = cookies().get("refresh_token")?.value;

  if (!accessToken && !refreshToken)
    return NextResponse.redirect("http://localhost:3001/auth/login");

  const decodedToken = accessToken ? jwtDecode(accessToken) : null;
  const timeRemaining = (decodedToken?.exp || 0) - Date.now() / 1000;

  const response = NextResponse.next();
  if (timeRemaining <= 0) {
    const session = await refresh();

    if (session?.accessToken) {
      response.cookies.set("access_token", session?.accessToken);
      response.cookies.set("refresh_token", session?.refreshToken);
    }
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
     * - auth routes
     */
    "/((?!api|_next/static|_next/image|favicon.ico|auth/*).*)",
  ],
};
