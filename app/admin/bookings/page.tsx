import BookingsAdmin from '@/components/BookingsAdmin/BookingsAdmin';
import css from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cars-rent',
    description: 'Admin bookings page',
};

const Page = () => {
    return (
        <main className={css.container}>
            <h3 className={css.title}>Список бронювань</h3>
            <BookingsAdmin />
        </main>
    );
};

export default Page;