import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AxiosError } from "axios";
import { globalServer } from "@/services/server-config";
import { LogoutResponse } from "@/types/auth";

export const POST = async () => {
  try {
    const cookieStorage = await cookies();

    const res = await globalServer.post<LogoutResponse>("/auth/logout", null, {
      headers: {
        Cookie: cookieStorage.toString(),
      },
    });

    cookieStorage.delete("accessToken");
    cookieStorage.delete("refreshToken");

    return NextResponse.json(res.data);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return NextResponse.json(
      { error: err.response?.data.message || err.message },
      { status: err.response?.status || 500 },
    );
  };
};