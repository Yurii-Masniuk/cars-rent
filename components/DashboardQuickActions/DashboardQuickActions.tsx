'use client';

import Link from 'next/link';
import css from './DashboardQuickActions.module.css';

const DashboardQuickActions = () => {
  return (
    <div className={css.actionsCard}>
      <div className={css.actionsHeader}>
        <h3>Операції</h3>
        <span className={css.actionsSubtitle}>Керування системою</span>
      </div>

      <div className={css.actionsGrid}>
        <Link href="/admin/cars/new" className={css.actionButton}>
          <span className={css.icon}>+</span>
          <span>Додати новий автомобіль</span>
        </Link>

        <Link href="/admin/cars" className={css.actionButton}>
          <span className={css.icon}>🚗</span>
          <span>Керування автопарком</span>
        </Link>

        <Link href="/admin/locations/new" className={css.actionButton}>
          <span className={css.icon}>📍</span>
          <span>Створити локацію</span>
        </Link>

        <Link href="/admin/users" className={css.actionButton}>
          <span className={css.icon}>👥</span>
          <span>Користувачі</span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardQuickActions;