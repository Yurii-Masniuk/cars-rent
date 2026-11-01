'use client';

import { useState } from 'react';
import css from './CarBookingActions.module.css';
import BookingFormCreate from '../BookingsList/BookingFormCreate/BookingFormCreate';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';

interface CarBookingActionsProps{
    carId: string,
    pricePerDay: number,
    status: string,
};

const CarBookingActions = ({ carId, pricePerDay, status }: CarBookingActionsProps) => {
    const router = useRouter();
    const user = useAuthStore((s) => s.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isActive = status === 'active';

    const handleBookingClick = () => {
        if (!user) {
            router.push('/login');
            return;
        };
        setIsModalOpen(true);
    };

    return (
        <div>
            {isActive ? (
                <button
                    className={css.bookButton}
                    onClick={handleBookingClick}
                >
                    {user ? 'Забронювати' : 'Увійдіть, щоб забронювати'}
                </button>
            ) : (
                <button className={css.bookButton} disabled>
                    Недоступно для бронювання
                </button>
            )}

            {isModalOpen && user && (
                <BookingFormCreate
                    carId={carId}
                    pricePerDay={pricePerDay}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default CarBookingActions;