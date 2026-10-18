import Sidebar from '@/components/Sidebar/Sidebar';
import css from './page.module.css';

const Page = () => {
  return (
    <div className={css['page']}>
      <Sidebar/>
    </div>
  );
};

export default Page;