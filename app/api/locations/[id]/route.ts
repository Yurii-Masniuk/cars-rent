import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { globalServer } from "@/services/server-config";
import { AxiosError } from "axios";

interface IdParams {
    params: Promise<{id:string}>,
};

export const GET = async (req: NextRequest, { params }: IdParams) => {
    try {
        const cookieStore = await cookies();
        const { id } = await params;
        const res = await globalServer.get(`/locations/${id}`, {
            headers: {
                Cookie: cookieStore.toString(),
            },
        },);
        return NextResponse.json(res.data);
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        return NextResponse.json(
            { error: err.response?.data.message || err.message },
            { status: err.response?.status || 500 },
        );
    };
};

export const PATCH = async (req: NextRequest, { params }: IdParams) => {
    try {
        const cookieStore = await cookies();
        const body = await req.json();
        const { id } = await params;
        const res = await globalServer.patch(`/locations/${id}`, body, {
            headers: {
                Cookie: cookieStore.toString(),
            },
        },);
        return NextResponse.json(res.data);
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        return NextResponse.json(
            { error: err.response?.data.message || err.message },
            { status: err.response?.status || 500 },
        );
    };
};

export const DELETE = async (req: NextRequest, { params }: IdParams) => {
    try {
        const cookieStore = await cookies();
        const { id } = await params;
        const res = await globalServer.delete(`/locations/${id}`, {
            headers: {
                Cookie: cookieStore.toString(),
            },
        },);
        return NextResponse.json(res.data);
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        return NextResponse.json(
            { error: err.response?.data.message || err.message },
            { status: err.response?.status || 500 },
        );
    };
};