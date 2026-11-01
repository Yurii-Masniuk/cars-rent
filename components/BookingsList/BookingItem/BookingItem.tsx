import { Booking, BookingStatus } from '@/types/bookings';
import css from './BookingItem.module.css';
import Link from 'next/link';

interface BookingItemProps{
    element: Booking,
};

const BookingItem = ({ element }: BookingItemProps) => {
    
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
    
    return (
        <li className={css.bookingItem}>

            <div className={css.content}>
                <h3>Бронювання № {element._id.slice(-6)}</h3>

                <ul className={css.specs}>
                    <li>
                        <span>Статус:</span>{' '}
                        <span className={css.elementStatus}>
                            {getStatusLabel(element.status)}
                        </span>
                    </li>
                    <li><span>Дата початку:</span> {new Date(element.startDate).toLocaleDateString()}</li>
                    <li><span>Дата закінчення:</span> {new Date(element.endDate).toLocaleDateString()}</li>
                    <li><span>Загальна вартість:</span> {element.totalPrice} $</li>
                </ul>

                <Link href={`/bookings/my/${element._id}`} className={css.detailsBtn}>
                    Деталі бронювання
                </Link>
            </div>
        </li>
    );
};

export default BookingItem;