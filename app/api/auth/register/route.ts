import { globalServer } from "@/services/server-config";
import { RegisterResponse } from "@/types/auth";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const res = await globalServer.post<RegisterResponse>("/auth/register", body);
    return NextResponse.json(res.data);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return NextResponse.json(
      { error: err.response?.data.message || err.message },
      { status: err.response?.status || 500 },
    );
  };
};