import { Metadata } from 'next';
import css from './page.module.css';
import CarsListAdmin from '@/components/CarsListAdmin/CarsListAdmin';

export const metadata: Metadata = {
    title: 'Cars-rent',
    description: 'Admin cars page',
};

const Page = () => {
  
  return (
    <main className={css.container}>
      <h2 className={css.title}>Список автомобілів</h2>
      <CarsListAdmin />
    </main>
  );
};

export default Page;