import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { parseCookie } from "cookie";
import { AxiosError } from "axios";
import { globalServer } from "@/services/server-config";
import { RefreshResponse } from "@/types/auth";

export const POST = async () => {
  try {
    const cookieStorage = await cookies();
    if (!cookieStorage.get("refreshToken")) {
      return NextResponse.json({ success: false });
    };
    if (cookieStorage.get("accessToken")) {
      return NextResponse.json({ success: true });
    };

    //!=================== ПЕРЕДАЄМО З ФРОНТЕНДУ COOKIE НА СЕРВЕР ======================
    const res = await globalServer.post<RefreshResponse>("/auth/refresh", null, {
      headers: {
        Cookie: cookieStorage.toString(),
      },
    });
    //!=================== ПЕРЕДАЄМО З ФРОНТЕНДУ COOKIE НА СЕРВЕР ======================


    //!================= ЗБЕРЕЖЕННЯ COOKIE з серверу на frontend ========================
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
    };
    //!======================================================================

    return NextResponse.json({ success: true });
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return NextResponse.json(
      { error: err.response?.data.message || err.message },
      { status: err.response?.status || 500 },
    );
  };
};