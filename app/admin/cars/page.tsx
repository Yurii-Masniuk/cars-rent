import CarsList from '@/components/CarsList/CarsList';
import css from './page.module.css';

const Page = () => {
  
  return (
    <main className={css.container}>
      <h2 className={css.title}>Список автомобілів</h2>
      <CarsList />
    </main>
  );
};

export default Page;