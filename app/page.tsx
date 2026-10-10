import Link from 'next/link';
import css from './page.module.css';

const Page = () => {
  return (
    <div className={css.page}>
      <h1 className={css.title}>Ласкаво просимо до Car Rent</h1>
      <p className={css.subtitle}>
        Орендуйте найкращі автомобілі швидко, безпечно та за вигідними цінами. Увійдіть у систему або зареєструйтеся, щоб почати подорож.
      </p>
      <div className={css.actions}>
        <Link href="/login" className={css.btnPrimary}>
          Увійти
        </Link>
        <Link href="/register" className={css.btnSecondary}>
          Реєстрація
        </Link>
      </div>
    </div>
  );
};

export default Page;