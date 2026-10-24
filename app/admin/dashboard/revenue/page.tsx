import DashboardRevenueChart from '@/components/DashboardRevenueChart/DashboardRevenueChart';
import css from './page.module.css';

const Page = () => {
  return (
    <div className={css.revenueChart}>
      <DashboardRevenueChart/>
    </div>
  );
};

export default Page;