import BookingsAdmin from '@/components/BookingsAdmin/BookingsAdmin';
import css from './page.module.css';

const Page = () => {
    return (
        <main className={css.container}>
            <h3 className={css.title}>Список бронювань</h3>
            <BookingsAdmin />
        </main>
    );
};

export default Page;