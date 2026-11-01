'use client';

import { useQuery } from '@tanstack/react-query';
import css from './BookingsList.module.css';
import { getMyBookings } from '@/services/bookings';
import { AxiosError } from 'axios';
import BookingItem from './BookingItem/BookingItem';

const BookingsList = () => {
    const queryBookings = useQuery({
        queryKey: ['booking'],
        queryFn: () => getMyBookings(),
    });

    const bookings = queryBookings.data?.bookings;
    const isLoading = queryBookings.isLoading;
    const error = queryBookings.error;

    const getErrorMessage = () => {
            if (!error) return null;
            const err = error as AxiosError<{ message: string }>;
            const status = err.response?.status;
    
            switch (status) {
                case 400:
                    return "Некоректний запит. Перевірте параметри.";
                case 401:
                    return "Будь ласка, увійдіть у систему.";
                case 404:
                    return "Немає бронювань";
                default:
                    if (status && status >= 500) {
                        return "Помилка на сервері. Спробуйте пізніше.";
                    } else {
                        return err.response?.data?.message || err.message || "Не вдалося завантажити список бронювань.";
                    };
            };
        };
    
        const errMessage = getErrorMessage();

    return (
        <div className={css.bookingsList}>
          
            {isLoading && <p className={css.loading}>Завантаження...</p>}
            {errMessage && <p className={css.error}>{errMessage}</p>}
            
            {bookings && (
                <ul className={css.bookingsList}>
                    {bookings?.map((el) => (
                        <BookingItem key={el._id} element={el} />
                    ))}
                </ul>
            )}

            {!isLoading && !error && !bookings && <p className={css.noCars}>Бронювань не знайдено</p>}

        </div>
    );
};

export default BookingsList;