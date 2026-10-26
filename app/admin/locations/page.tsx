import LocationsList from '@/components/LocationsList/LocationsList';
import css from './page.module.css';

const Page = () => {
  return (
    <main className={css.container}>
      <h2 className={css.title}>Список локацій:</h2>
      <LocationsList />
    </main>
  );
};

export default Page;