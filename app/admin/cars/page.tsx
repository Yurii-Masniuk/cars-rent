import css from './page.module.css';
import CarsListAdmin from '@/components/CarsListAdmin/CarsListAdmin';

const Page = () => {
  
  return (
    <main className={css.container}>
      <h2 className={css.title}>Список автомобілів</h2>
      <CarsListAdmin isAdminPage={true} />
    </main>
  );
};

export default Page;