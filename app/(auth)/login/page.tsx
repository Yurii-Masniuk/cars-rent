import FormLogin from '@/components/FormLogin/FormLogin';
import css from './page.module.css';

const Page = () => {
  return (
    <div className={css['page']}>
      <FormLogin/>
    </div>
  );
};

export default Page;