import Link from 'next/link';
import css from './page.module.css';
import BookingsList from '@/components/BookingsList/BookingsList';

const Page = () => {
    return (
        <main className={css.container}>
            <Link href="/cars" className={css.backBtn}>
                &larr; Назад до каталогу
            </Link>
            <h3>Мої бронювання</h3>
            <BookingsList/>
        </main>
    );
};

export default Page;