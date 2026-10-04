import { Booking, CreateBookingBody, GetBookingResponse, UpdateBookingStatusBody } from "@/types/bookings";
import { proxyServer } from "./server-config";

export const getBookings = async () => {
    const res = await proxyServer.get<GetBookingResponse>('/bookings');
    return res.data;
};

export const createBooking = async (body: CreateBookingBody) => {
    const res = await proxyServer.post<Booking>('/bookings', body);
    return res.data;
};

export const getMyBookings = async () => {
    const res = await proxyServer.get<GetBookingResponse>(`/bookings/my`);
    return res.data;
};

export const getBookingById = async (id: string) => {
    const res = await proxyServer.get<Booking>(`/bookings/${id}`);
    return res.data;
};

export const cancelBookingById = async (id: string) => {
    const res = await proxyServer.patch<Booking>(`/bookings/${id}/cancel`);
    return res.data;
};

export const updateStatusBooking = async (id: string, body: UpdateBookingStatusBody) => {
    const res = await proxyServer.patch<Booking>(`/bookings/${id}/status`, body);
    return res.data;
};
