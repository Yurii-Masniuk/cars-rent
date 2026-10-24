import DashboardStatsCards from '@/components/DashboardStatsCards/DashboardStatsCards';
import css from './page.module.css';
import DashboardFleetStats from '@/components/DashboardFleetStats/DashboardFleetStats';
import DashboardQuickActions from '@/components/DashboardQuickActions/DashboardQuickActions';
import Link from 'next/link';

const Page = async () => {
  
  return (
    <div className={css.dashboardContainer}>

      <DashboardStatsCards />
      <div className={css.chartsGrid}>
        <Link href={'/admin/dashboard/revenue'}>
          Дохід за поточний місяц
        </Link>
        <DashboardFleetStats />
      </div>
      <div className={css.quickActions}>
        <DashboardQuickActions />
      </div>
      
    </div>
  );
};

export default Page;