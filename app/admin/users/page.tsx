import UserList from '@/components/UserList/UserList';
import css from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cars-rent',
    description: 'Admin users page',
};

const Page = () => {
  return (
    <main className={css.container}>
      <h2 className={css.title}>Список користувачів</h2>
      <UserList />
    </main>
  );
};

export default Page;