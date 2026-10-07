import Link from 'next/link';
import css from './page.module.css';

const Page = () => {
  return (
    <div className={css['page']}>
      <h3>HOME PAGE</h3>
      <Link href='/login'>
        Log in
      </Link>
      <Link href='/register'>
        Register
      </Link>
    </div>
  );
};

export default Page;