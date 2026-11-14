import LocationsList from '@/components/LocationsList/LocationsList';
import css from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cars-rent',
    description: 'Admin locations page',
};

const Page = () => {
  return (
    <main className={css.container}>
      <h2 className={css.title}>Список локацій:</h2>
      <LocationsList />
    </main>
  );
};

export default Page;