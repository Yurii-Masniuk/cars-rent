'use client';

import { Booking, BookingStatus } from '@/types/bookings';
import css from './BookingsItemAdmin.module.css';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getCarById } from '@/services/cars';
import { useState } from 'react';
import BookingFormEditAdmin from '../BookingFormEditAdmin/BookingFormEditAdmin';

interface BookingsItemAdminProps{
    element: Booking,
};

const BookingsItemAdmin = ({ element }: BookingsItemAdminProps) => {
    
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

    return (
        <>
            <li className={css.bookingItem}>
                <div className={css.content}>
                    <h3>Бронювання № {element._id.slice(-6)}</h3>

                    <ul className={css.specs}>
                        <li>
                            <h4 className={css.carIdBook}>
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
                        >
                            Редагувати
                        </button>
                    </div>
                </div>
            </li>
      
            {isEditModalOpen && (
                <BookingFormEditAdmin
                    bookingId={element._id}
                    status={element.status}
                    startDate={element.startDate}
                    endDate={element.endDate}
                    pricePerDay={queryCar.data?.pricePerDay ?? 0}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
        </>
    );
};

export default BookingsItemAdmin;