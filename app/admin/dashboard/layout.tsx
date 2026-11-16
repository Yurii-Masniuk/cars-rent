import DashboardQuickActions from '@/components/DashboardQuickActions/DashboardQuickActions';
import css from './layout.module.css';

interface LayoutProps {
    fleet: React.ReactNode,
    revenue: React.ReactNode,
    stats: React.ReactNode,
};

const Layout = ({fleet, revenue, stats}: LayoutProps) => {
    return (
        <div className={css.dashboardContainer}>
            {stats}

            <div className={css.chartsGrid}>
                {revenue}
                {fleet}

            </div>
            <div className={css.quickActions}>
                <DashboardQuickActions />
            </div>
      
        </div>
    );
};

export default Layout;