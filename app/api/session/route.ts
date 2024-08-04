import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 5 * 1000,
  secure: false,
  httpOnly: true,
};

export async function GET() {
  console.log(cookies().toString());
  
  const accessToken = cookies().get("access_token")?.value;
  const refreshToken = cookies().get("refresh_token")?.value;

  try {
    let res = await fetch("http://localhost:3000/api/users/current", {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: `access_token=${accessToken};refresh_token=${refreshToken}`,
        "Content-type": "application/json",
      },
      cache: "no-store",
    });

    if (res.status == 401) {
      res = await fetch("http://localhost:3000/api/auth/refresh", {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: `access_token=${accessToken};refresh_token=${refreshToken}`,
          "Content-type": "application/json",
        },
        cache: "no-store",
      });
      
    }

    const data = await res.json();
    const result = NextResponse.json(data);

    return result;
  } catch (error) {
    try {
      let res = await fetch("http://localhost:3000/api/auth/refresh", {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: `access_token=${accessToken};refresh_token=${refreshToken}`,
          "Content-type": "application/json",
        },
        cache: "no-store",
      });
      const data = await res.json();
      console.log("refresh: ", data);
      // cookies().set("refresh_token", "")
      // cookies().set("new_access_token", "");
      const result = NextResponse.json(data);
      result.cookies.set("test", "hello", COOKIE_OPTIONS);
      return result;
    } catch (error: any) {
      console.log("error:", error.response?.data);
      return NextResponse.json(null);
    }
  }
}
