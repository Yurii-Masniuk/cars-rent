import FormLogin from '@/components/FormLogin/FormLogin';
import css from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cars-rent',
    description: 'Login page',
};

const Page = () => {
  return (
    <div className={css['page']}>
      <FormLogin/>
    </div>
  );
};

export default Page;