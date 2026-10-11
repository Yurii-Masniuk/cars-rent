import Link from 'next/link';
import css from './page.module.css';

const Page = () => {
  return (
    <main className={css.main}>
      <div className={css.hero}>
        <h1 className={css.title}>Ласкаво просимо до DriveGo</h1>
        <p className={css.subtitle}>
          Орендуйте найкращі автомобілі швидко, безпечно та за вигідними цінами. Увійдіть у систему або зареєструйтеся, щоб почати подорож.
        </p>

        <div className={css.actions}>
          <Link href="/cars" className={css.primaryBtn}>
            Перейти до авто
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Page;