import axios from "axios";
import { cookies } from "next/headers";

const extractCookies: (setCookies: string[]) => {
  accessToken: string;
  refreshToken: string;
} = (setCookies: string[]) => {
  const splitCookies = setCookies[0].split(";");
  const accessToken = splitCookies[0].split("=")[1];
  const refreshToken = splitCookies[4].split("=")[1];

  return {
    accessToken,
    refreshToken,
  };
};

export const fetchData: (
  route: string,
  method: "GET" | "POST",
  body: any,
  newCookies: string | null
) => any = async (
  route: string,
  method: "GET" | "POST",
  body: any,
  newCookies: string | null
) => {
  try {
    let res;

    // fetch / mutate data
    if (method === "GET") {
      res = await fetch("http://localhost:3000/api/" + route, {
        method,
        credentials: "include",
        headers: {
          Cookie: newCookies ?? cookies().toString(),
          "Content-type": "application/json",
        },
        cache: "no-store",
      });
    } else {
      res = await fetch("http://localhost:3000/api/" + route, {
        method,
        credentials: "include",
        headers: {
          Cookie: newCookies ?? cookies().toString(),
          "Content-type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(body),
      });
    }

    // Invalid token, refresh it
    if (res.status === 401) {
      res = await fetch("http://localhost:3000/api/auth/refresh", {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: cookies().toString(),
          "Content-type": "application/json",
        },
        cache: "no-store",
      });

      // invalid refresh token
      if (res.status === 401) return null;

      // redo the fetch with the new cookies
      const { accessToken, refreshToken } = extractCookies(
        res.headers.getSetCookie()
      );
      const updatedCookies = `access_token=${accessToken};refresh_token=${refreshToken}`;
      return await fetchData(route, method, body, updatedCookies);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const getSession = async () => {
  const res = await fetchData("users/current", "GET", {}, null);
  return res;
};

export const refresh = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/refresh", {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: cookies().toString(),
        "Content-type": "application/json",
      },
      cache: "no-store",
    });
    return extractCookies(res.headers.getSetCookie());
  } catch (error) {}
};

export const login = async (data: any) => {
  try {
    const url = (process.env.NEXT_PUBLIC_API_URL as string) + "/auth/login";
    const res = await axios.post(url, data, {
      withCredentials: true,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
