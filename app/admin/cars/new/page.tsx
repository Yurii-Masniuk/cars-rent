import css from './page.module.css';
import Link from 'next/link';
import CarFormCreateAdmin from '@/components/CarsListAdmin/CarFormCreateAdmin/CarFormCreateAdmin';

const Page = async () => {

   return (
        <main className={css.container}>
            <Link href={`/admin/cars/`} className={css.backBtn}>
                &larr; Назад до списку
            </Link>

            <h2 className={css.title}>Створити новий автомобіль:</h2>
            <CarFormCreateAdmin/>
        </main>
    );
};

export default Page;