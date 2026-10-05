import { globalServer } from "@/services/server-config";
import { AxiosError } from "axios";
import { parseCookie } from "cookie";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const res = await globalServer.post("/auth/login", body);

    //!================= ЗБЕРЕЖЕННЯ COOKIE з серверу на frontend ========================
    const cookieStorage = await cookies();

    const setCookie = res.headers["set-cookie"] as string[];
    for (const cookieStr of setCookie) {
        const cookie = parseCookie(cookieStr);
      const options = {
        maxAge: Number(cookie["Max-Age"]),
        path: cookie.Path,
        expires: cookie.expires ? new Date(cookie.expires) : undefined,
      };

      if (cookie.refreshToken) {
        cookieStorage.set("refreshToken", cookie.refreshToken, options);
      }

      if (cookie.accessToken) {
        cookieStorage.set("accessToken", cookie.accessToken, options);
      }
    }
    //!======================================================================

    return NextResponse.json(res.data);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return NextResponse.json(
      { error: err.response?.data.message || err.message },
      { status: err.response?.status || 500 },
    );
  };
};