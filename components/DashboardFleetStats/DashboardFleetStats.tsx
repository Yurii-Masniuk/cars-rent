'use client';

import { useQuery } from '@tanstack/react-query';
import css from './DashboardFleetStats.module.css';
import { getFleetStatistic } from '@/services/admin';
import { AxiosError } from 'axios';

const DashboardFleetStats = () => {

  const queryData = useQuery({
    queryKey: ['dashboard-fleet'],
    queryFn: () => getFleetStatistic(),
  });
  
  const fleetData = queryData.data;
  const isLoading = queryData.isLoading;
  const error = queryData.error;

  const getErrorMessage = () => {
    if (!error) return null;
    const err = error as AxiosError<{ message: string }>;
    const status = err.response?.status;
  
    switch (status) {
      case 400:
        return "Некоректний запит для статистики автопарку.";
      case 401:
        return "Будь ласка, увійдіть у систему.";
      case 404:
        return "Дані про автопарк відсутні.";
      default:
        if (status && status >= 500) {
          return "Помилка на сервері при завантаженні статистики.";
        } else {
          return err.response?.data?.message || err.message || "Не вдалося отримати статистику автопарку.";
        }
    }
  };
  
  const errMessage = getErrorMessage();

  return (
    <div className={css.fleetCard}>
      <div className={css.fleetHeader}>
        <h3>Статистика автопарку</h3>
        <span className={css.fleetSubtitle}>Розподіл за параметрами</span>
      </div>

      {isLoading && <p className={css.loading}>Завантаження статистики автопарку...</p>}
      {errMessage && <p className={css.error}>{errMessage}</p>}

      {!isLoading && !errMessage && fleetData && (
        <div className={css.statsGrid}>
          {fleetData.byStatus && fleetData.byStatus.length > 0 && (
            <div className={css.statSection}>
              <h4>За статусом</h4>
              <ul className={css.statList}>
                {fleetData.byStatus.map((item, index) => (
                  <li key={index} className={css.statItem}>
                    <span>{item.status}</span>
                    <span className={css.statValue}>{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {fleetData.byCategory && fleetData.byCategory.length > 0 && (
            <div className={css.statSection}>
              <h4>За категорією</h4>
              <ul className={css.statList}>
                {fleetData.byCategory.map((item, index) => (
                  <li key={index} className={css.statItem}>
                    <span>{item.category}</span>
                    <span className={css.statValue}>{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {fleetData.byFuelType && fleetData.byFuelType.length > 0 && (
            <div className={css.statSection}>
              <h4>Тип пального</h4>
              <ul className={css.statList}>
                {fleetData.byFuelType.map((item, index) => (
                  <li key={index} className={css.statItem}>
                    <span>{item.fuelType}</span>
                    <span className={css.statValue}>{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {fleetData.byTransmission && fleetData.byTransmission.length > 0 && (
            <div className={css.statSection}>
              <h4>Коробка передач</h4>
              <ul className={css.statList}>
                {fleetData.byTransmission.map((item, index) => (
                  <li key={index} className={css.statItem}>
                    <span>{item.transmission}</span>
                    <span className={css.statValue}>{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {!isLoading && !errMessage && !fleetData && (
        <p className={css.noData}>Немає даних про автопарк</p>
      )}
    </div>
  );
};

export default DashboardFleetStats;