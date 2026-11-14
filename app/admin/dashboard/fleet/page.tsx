import { Metadata } from 'next';
import css from './page.module.css';

export const metadata: Metadata = {
    title: 'Cars-rent',
    description: 'Admin dashboard fleet page',
};

const Page = () => {
  return (
    <div className={css['page']}>
      Page
    </div>
  );
};

export default Page;