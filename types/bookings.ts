export type BookingStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';

export interface Booking {
    _id: string;
    userId: string;
    carId: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: BookingStatus;
    cancelledAt: string | null;
    createdAt: string;
    updatedAt: string;
};

export interface GetBookingResponse {
    bookings: Booking[];
};

export interface CreateBookingBody {
    carId: string;
    startDate: string;
    endDate: string;
};

export interface UpdateBookingStatusBody {
    status: BookingStatus;
};