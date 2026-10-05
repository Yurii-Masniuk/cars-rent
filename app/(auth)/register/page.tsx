import FormRegister from '@/components/FormRegister/FormRegister';
import css from './Page.module.css';

const Page = () => {
  return (
    <div className={css['page']}>
      <FormRegister/>
    </div>
  );
};

export default Page;