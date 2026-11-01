'use client';

import { useState } from 'react';
import css from './CarBookingActions.module.css';
import BookingFormCreate from '../BookingsList/BookingFormCreate/BookingFormCreate';

interface CarBookingActionsProps{
    carId: string,
    pricePerDay: number,
    status: string,
};

const CarBookingActions = ({ carId, pricePerDay, status }: CarBookingActionsProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isActive = status === 'active';

    return (
        <div>
            {isActive ? (
                <button
                    className={css.bookButton}
                    onClick={() => setIsModalOpen(true)}
                >
                    Забронювати
                </button>
            ) : (
                <button className={css.bookButton} disabled>
                    Забронювати
                </button>
            )}

            {isModalOpen && (
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