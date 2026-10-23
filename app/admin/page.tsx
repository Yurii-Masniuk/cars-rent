import css from './page.module.css';

const Page = () => {
  return (
    <div className={css.page}>
      <main className={css.content}>
        <h1>Адмін-панель</h1>
      </main>
    </div>
  );
};

export default Page;