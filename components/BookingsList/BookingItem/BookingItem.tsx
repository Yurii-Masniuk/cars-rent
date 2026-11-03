'use client';

import { Booking, BookingStatus } from '@/types/bookings';
import css from './BookingItem.module.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cancelBookingById } from '@/services/bookings';
import { useState } from 'react';
import BookingFormEdit from '../BookingFormEdit/BookingFormEdit';
import { getCarById } from '@/services/cars';
import Link from 'next/link';

interface BookingItemProps{
    element: Booking,
};

const BookingItem = ({ element }: BookingItemProps) => {

    const queryClient = useQueryClient();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    const getStatusLabel = (status: BookingStatus) => {
        switch (status) {
            case 'pending': return 'Очікує підтвердження';
            case 'confirmed': return 'Підтверджено';
            case 'active': return 'Активне';
            case 'completed': return 'Завершено';
            case 'cancelled': return 'Скасовано';
            default: return status;
        };
    };

    const queryCar = useQuery({
        queryKey: ['carId', element.carId],
        queryFn: () => getCarById(element.carId),
    });

    const carDetails = queryCar.data?.model;

    const cancelMutation = useMutation({
        mutationFn: (id: string) => cancelBookingById(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
    });

    const handleCancel = () => {
        if (confirm('Ви впевнені, що хочете скасувати це бронювання?')) {
            cancelMutation.mutate(element._id);
        }
    };
    
    return (
        <>
            <li className={css.bookingItem}>
                <div className={css.content}>
                    <h3>Бронювання № {element._id.slice(-6)}</h3>

                    <ul className={css.specs}>
                        <li>                            
                            <h4  className={css.carIdBook}>
                                <Link href={`/cars/${element.carId}`}>
                                    Автомобіль: {carDetails}
                                    </Link>
                            </h4>
                            <span>Статус:</span>{' '}
                            <span className={`${css.elementStatus} ${css[element.status]}`}>
                                {getStatusLabel(element.status)}
                            </span>
                        </li>
                        <li><span>Дата початку:</span> {new Date(element.startDate).toLocaleDateString()}</li>
                        <li><span>Дата закінчення:</span> {new Date(element.endDate).toLocaleDateString()}</li>
                
                        {element.cancelledAt && (
                            <li><span>Дата скасування:</span> {new Date(element.cancelledAt).toLocaleDateString()}</li>
                        )}

                        <li><span>Загальна вартість:</span> {element.totalPrice} $</li>
                    </ul>

                    <div className={css.actions}>
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className={css.editBtn}
                            disabled={element.status === 'cancelled'}
                        >
                            Редагувати
                        </button>

                        <button
                            onClick={handleCancel}
                            disabled={cancelMutation.isPending || element.status === 'cancelled'}
                            className={css.cancelBtn}
                        >
                            {cancelMutation.isPending ? 'Скасування...' : 'Скасувати'}
                        </button>
                    </div>
                </div>
            </li>
            
            {isEditModalOpen && (
                <BookingFormEdit
                    bookingId={element._id}
                    status={element.status}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}

        </>
        
    );
};

export default BookingItem;