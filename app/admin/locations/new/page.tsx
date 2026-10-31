import Link from 'next/link';
import css from './page.module.css';
import LocationFormCreate from '@/components/LocationsList/LocationFormCreate/LocationFormCreate';

const Page = () => {
  return (
        <main className={css.container}>
            <Link href={`/admin/locations/`} className={css.backBtn}>
                &larr; Назад до списку
            </Link>

            <h2 className={css.title}>Створити нову локацію:</h2>
            <LocationFormCreate/>
        </main>
    );
};

export default Page;