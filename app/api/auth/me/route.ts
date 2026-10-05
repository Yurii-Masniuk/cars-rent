import { globalServer } from "@/services/server-config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const cookieStorage = await cookies();

  const res = await globalServer.get("/auth/me", {
    headers: {
      Cookie: cookieStorage.toString(),
    },
  });

  return NextResponse.json(res.data);
};