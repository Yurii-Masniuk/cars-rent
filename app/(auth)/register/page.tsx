import FormRegister from '@/components/FormRegister/FormRegister';
import css from './page.module.css';

const Page = () => {
  return (
    <div className={css['page']}>
      <FormRegister/>
    </div>
  );
};

export default Page;