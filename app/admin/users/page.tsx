import UserList from '@/components/UserList/UserList';
import css from './page.module.css';

const Page = () => {
  return (
    <main className={css.container}>
      <h2 className={css.title}>Список користувачів</h2>
      <UserList />
    </main>
  );
};

export default Page;