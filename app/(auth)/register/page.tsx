import FormRegister from '@/components/FormRegister/FormRegister';
import css from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cars-rent',
    description: 'Registration page',
};

const Page = () => {
  return (
    <div className={css['page']}>
      <FormRegister/>
    </div>
  );
};

export default Page;