'use client';

import { useRouter } from 'next/navigation';
import css from './BookingFormEdit.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { updateStatusBooking } from '@/services/bookings';
import { BookingStatus } from '@/types/bookings';

interface BookingFormEditAdminProps {
    bookingId: string;
    status: BookingStatus;
    startDate: string;
    endDate: string;
    pricePerDay: number;
    onClose: () => void;
};

const BookingFormEdit = ({ 
    bookingId, 
    status, 
    startDate: initialStartDate, 
    endDate: initialEndDate, 
    pricePerDay, 
    onClose }: BookingFormEditAdminProps) => {

    const router = useRouter();
    const queryClient = useQueryClient();

    const [startDate, setStartDate] = useState(initialStartDate ? initialStartDate.split('T')[0] : '');
    const [endDate, setEndDate] = useState(initialEndDate ? initialEndDate.split('T')[0] : '');
    const [bookingStatus] = useState<BookingStatus>(status);

    const calculateTotalPrice = () => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays * pricePerDay : 0;
    };

    const totalPrice = calculateTotalPrice();

    const mutation = useMutation({
        mutationFn: (body: { startDate: string; endDate: string; status: BookingStatus }) => 
            updateStatusBooking(bookingId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myBookings'] });
            onClose();
            router.push('/bookings/my');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!startDate || !endDate) return;
        
        mutation.mutate({
            startDate,
            endDate,
            status: bookingStatus,
        });
    };

    const getErrorMessage = () => {
        if (!mutation.error) return null;
        const err = mutation.error as AxiosError<{ message: string }>;
        return err.response?.data?.message || err.message || "Помилка при оновленні бронювання";
    };

    const errMessage = getErrorMessage();
    const isLoading = mutation.isPending;
    
    return (
        <div className={css.backdrop} onClick={onClose}>
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                <h3>Редагування бронювання</h3>

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
                            Загальна вартість: <b>{totalPrice} $</b>
                        </p>
                    )}
                
                    {errMessage && <p className={css.error}>{errMessage}</p>}

                    <div className={css.actions}>
                        <button type="button" onClick={onClose} className={css.cancelBtn}>
                            Скасувати
                        </button>
                        <button type="submit" disabled={isLoading} className={css.submitBtn}>
                            {isLoading ? 'Збереження...' : 'Зберегти зміни'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingFormEdit;