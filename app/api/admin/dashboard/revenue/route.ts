import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { globalServer } from "@/services/server-config";
import { AxiosError } from "axios";

export const GET = async () => {
    try {
        const cookieStore = await cookies();
        const res = await globalServer.get('/admin/dashboard/revenue', {
            headers: {
                Cookie: cookieStore.toString(),
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