import DashboardStatsCards from '@/components/DashboardStatsCards/DashboardStatsCards';
import css from './page.module.css';
import DashboardFleetStats from '@/components/DashboardFleetStats/DashboardFleetStats';
import DashboardQuickActions from '@/components/DashboardQuickActions/DashboardQuickActions';
import DashboardRevenueChart from '@/components/DashboardRevenueChart/DashboardRevenueChart';

const Page = async () => {
  
  return (
    <div className={css.dashboardContainer}>

      <DashboardStatsCards />
      <div className={css.chartsGrid}>
        <DashboardRevenueChart />
        <DashboardFleetStats />
      </div>
      <div className={css.quickActions}>
        <DashboardQuickActions />
      </div>
      
    </div>
  );
};

export default Page;