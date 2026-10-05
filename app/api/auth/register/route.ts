import { globalServer } from "@/services/server-config";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const res = await globalServer.post("/auth/register", body);
  return NextResponse.json(res.data);
};