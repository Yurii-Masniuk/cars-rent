import { globalServer } from "@/services/server-config";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const cookieStorage = await cookies();
    const res = await globalServer.get("/auth/me", {
      headers: {
        Cookie: cookieStorage.toString(),
      },
    });
    return NextResponse.json(res.data);

  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return NextResponse.json(
      { error: err.response?.data.message || err.message },
      { status: err.response?.status || 500 },
    );
  };
};