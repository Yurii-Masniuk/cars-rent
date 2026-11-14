import DashboardRevenueChart from '@/components/DashboardRevenueChart/DashboardRevenueChart';
import css from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cars-rent',
    description: 'Admin dashboard revenue page',
};

const Page = () => {
  return (
    <div className={css.revenueChart}>
      <DashboardRevenueChart/>
    </div>
  );
};

export default Page;