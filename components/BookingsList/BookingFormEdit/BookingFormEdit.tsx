'use client';

import { useRouter } from 'next/navigation';
import css from './BookingFormEdit.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { BookingStatus, UpdateBookingStatusBody } from '@/types/bookings';
import { updateStatusBooking } from '@/services/bookings';
import { AxiosError } from 'axios';

interface BookingFormEditProps{
    bookingId: string,
    status: BookingStatus,
    onClose: () => void,
};

const BookingFormEdit = ({ bookingId, status, onClose }: BookingFormEditProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();

     const [formData, setFormData] = useState<UpdateBookingStatusBody>({
            status: status,
        });

    const mutation = useMutation({
        mutationFn: (body: UpdateBookingStatusBody) => updateStatusBooking(bookingId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            onClose();
            router.push('/bookings/my');
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value as BookingStatus,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

     const getErrorMessage = () => {
            if (!mutation.error) return null;
            const err = mutation.error as AxiosError<{ message: string }>;
            return err.response?.data?.message || err.message || "Помилка при редагуванні";
        };
    
        const errMessage = getErrorMessage();
        const isLoading = mutation.isPending;
    
    
    return (
        <div className={css.backdrop} onClick={onClose}>
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                <h3>Оновлення статусу бронювання</h3>

                <form onSubmit={handleSubmit} className={css.form}>
                    <div>
                        <label>Змінити статус</label>
                        <select
                            name='status'
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="pending">Очікує підтвердження</option>
                            <option value="confirmed">Підтверджено</option>
                            <option value="active">Активне</option>
                            <option value="completed">Завершено</option>
                            <option value="cancelled">Скасовано</option>
                        </select>
                    </div>

                    {errMessage && <p className={css.error}>{errMessage}</p>}

                    <div className={css.actions}>
                        <button type="button" onClick={onClose} className={css.cancelBtn}>
                            Скасувати
                        </button>
                        <button type="submit" disabled={isLoading} className={css.submitBtn}>
                            {isLoading ? 'Обробка...' : 'Зберегти зміни'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingFormEdit;