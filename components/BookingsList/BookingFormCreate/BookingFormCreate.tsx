'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './BookingFormCreate.module.css';
import { useState } from 'react';
import { createBooking } from '@/services/bookings';
import { CreateBookingBody } from '@/types/bookings';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface BookingFormCreateProps{
    carId: string,
    pricePerDay: number,
    onClose: () => void,
};

const BookingFormCreate = ({ carId, pricePerDay, onClose }: BookingFormCreateProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const mutation = useMutation({
        mutationFn: (body: CreateBookingBody) => createBooking(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            onClose();
            router.push('/bookings/my');
        },
    });

    const calculateTotalPrice = () => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays * pricePerDay : 0;
    };

    const totalPrice = calculateTotalPrice();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!startDate || !endDate) return;
        mutation.mutate({
            carId,
            startDate,
            endDate,
        });
    };

    const getErrorMessage = () => {
        if (!mutation.error) return null;
        const err = mutation.error as AxiosError<{ message: string }>;
        return err.response?.data?.message || err.message || "Помилка при створенні бронювання";
    };

    const errMessage = getErrorMessage();
    const isLoading = mutation.isPending;

    return (
        <div className={css.backdrop} onClick={onClose}>
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                <h3>Бронювання автомобіля</h3>

                <form onSubmit={handleSubmit} className={css.form}>
                  
                    <div className={css.field}>
                        <label>Дата початку:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>
                  
                    <div className={css.field}>
                        <label>Дата закінчення:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>
                  
                    {totalPrice > 0 && (
                        <p className={css.total}>
                            Орієнтовна вартість: <b>{totalPrice} $</b>
                        </p>
                    )}
                  
                    {errMessage && <p className={css.error}>{errMessage}</p>}

                    <div className={css.actions}>
                        <button type="button" onClick={onClose} className={css.cancelBtn}>
                            Скасувати
                        </button>
                        <button type="submit" disabled={isLoading} className={css.submitBtn}>
                            {isLoading ? 'Обробка...' : 'Підтвердити бронювання'}
                        </button>
                    </div>
                  
                </form>

            </div>

        </div>
    );
};

export default BookingFormCreate;